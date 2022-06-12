import {
  ANY_KEY,
  ValidationError,
  _undefined,
  assertNotUndefined,
  isObject,
  keyDoesNotExist,
  or,
  string,
} from '@savchenko91/schema-validator'

import { BindingUnit, CompSchema, EventUnit, EventUnitType, Norm } from '../model/types'

import { ROOT_ID } from '@/constants/common'
import { findEntities } from '@/lib/entity-actions'
import { rootWrapArr } from '@/lib/validators'

export function assertCompSchema(input: unknown): asserts input is CompSchema {
  if (isObject(input) && 'componenName' in input && input.componenName === null) {
    throw Error('is not a CompSchema type')
  }
}

export function assertEventBindings(input: unknown): asserts input is Norm<BindingUnit> {
  const messages = {
    [EventUnitType.EVENT]: 'event cannot be a child',
    [EventUnitType.ACTION]: 'action must be a child of event',
    [EventUnitType.ASSERTION]: 'assertion must be a child of action or operator',
    [EventUnitType.OPERATOR]: 'operator must be a child of action or operator',
    [EventUnitType.ROOT]: 'root must be root',
  }

  const validateBindingUnit = rootWrapArr(
    or(
      {
        [ANY_KEY]: {
          id: string,
          name: string,
          children: or([string], keyDoesNotExist),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props: or(keyDoesNotExist, {}),
        },
      },
      _undefined
    )
  )

  const errors = validateBindingUnit(input)

  if (Array.isArray(errors)) {
    const error = Object.values(errors)[0] as ValidationError

    throw new ValidationError({
      inputName: error._path.split('.')[0] as string,
      code: assertEventBindings.name,
      path: error._path,
      message: error._message,
    })
  }

  if (isObject(input)) {
    const bindings = input as Norm<EventUnit>

    const rootBinding = bindings[ROOT_ID]
    assertNotUndefined(rootBinding)
    assertNotUndefined(rootBinding.children)

    const eventUnits = findEntities(rootBinding.children, bindings)

    Object.values(eventUnits).forEach((eventUnit) => {
      if (eventUnit.type !== EventUnitType.EVENT) {
        throw new ValidationError({
          inputName: eventUnit.id,
          code: assertEventBindings.name,
          path: eventUnit.id,
          message: messages[eventUnit.type],
        })
      }

      const actionUnits = findEntities(eventUnit.children || [], bindings)

      Object.values(actionUnits).forEach((actionUnit) => {
        if (actionUnit.type !== EventUnitType.ACTION) {
          throw new ValidationError({
            inputName: actionUnit.id,
            code: assertEventBindings.name,
            path: actionUnit.id,
            message: messages[actionUnit.type],
          })
        }

        const assertionUnits = findEntities(actionUnit.children || [], bindings)

        Object.values(assertionUnits).forEach((assertionUnit) => {
          if (assertionUnit.type !== EventUnitType.ASSERTION && assertionUnit.type !== EventUnitType.OPERATOR) {
            throw new ValidationError({
              inputName: assertionUnit.id,
              code: assertEventBindings.name,
              path: assertionUnit.id,
              message: messages[assertionUnit.type],
            })
          }
        })
      })
    })
  }
}
