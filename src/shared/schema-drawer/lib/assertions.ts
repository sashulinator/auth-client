import {
  ANY_KEY,
  ValidationError,
  _undefined,
  assertNotUndefined,
  isObject,
  keyDoesNotExist,
  only,
  or,
  string,
} from '@savchenko91/schema-validator'

import { Binding, Catalog, ComponentCompSchema, EventBinding, EventType } from '../model/types'

import { ROOT_ID } from '@/constants/common'
import { findEntities } from '@/lib/entity-actions'
import { rootWrapArr } from '@/lib/validators'

export function assertCompSchema(input: unknown): asserts input is ComponentCompSchema {
  if (isObject(input) && 'componenName' in input && input.componenName === null) {
    throw Error('is not a CompSchema type')
  }
}

export function assertEventBindings(input: unknown): asserts input is Catalog<Binding> {
  const messages = {
    [EventType.EVENT]: 'event cannot be a child',
    [EventType.ACTION]: 'action must be a child of event',
    [EventType.ASSERTION]: 'assertion must be a child of action or operator',
    [EventType.OPERATOR]: 'operator must be a child of action or operator',
    [EventType.ROOT]: 'root must be root',
  }

  const validateBindingUnit = rootWrapArr(
    or(
      {
        catalog: {
          [ANY_KEY]: only({
            id: string,
            name: string,
            type: string,
            children: or([string], keyDoesNotExist),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            props: or(keyDoesNotExist, {}),
          }),
        },
      },
      _undefined
    )
  )

  const errors = validateBindingUnit(input)

  console.log('err', { ...errors?.[0] })
  console.log('input', input)

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
    const bindings = input as Catalog<EventBinding>

    const rootBinding = bindings[ROOT_ID]
    assertNotUndefined(rootBinding)
    assertNotUndefined(rootBinding.children)

    const eventUnits = findEntities(rootBinding.children, bindings)

    Object.values(eventUnits).forEach((eventUnit) => {
      if (eventUnit.type !== EventType.EVENT) {
        throw new ValidationError({
          inputName: eventUnit.id,
          code: assertEventBindings.name,
          path: eventUnit.id,
          message: messages[eventUnit.type],
        })
      }

      const actionUnits = findEntities(eventUnit.children || [], bindings)

      Object.values(actionUnits).forEach((actionUnit) => {
        if (actionUnit.type !== EventType.ACTION) {
          throw new ValidationError({
            inputName: actionUnit.id,
            code: assertEventBindings.name,
            path: actionUnit.id,
            message: messages[actionUnit.type],
          })
        }

        const assertionUnits = findEntities(actionUnit.children || [], bindings)

        Object.values(assertionUnits).forEach((assertionUnit) => {
          if (assertionUnit.type !== EventType.ASSERTION && assertionUnit.type !== EventType.OPERATOR) {
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
