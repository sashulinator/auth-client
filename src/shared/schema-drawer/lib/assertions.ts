import {
  ANY_KEY,
  ValidationError,
  _undefined,
  isObject,
  keyDoesNotExist,
  only,
  or,
  string,
} from '@savchenko91/schema-validator'

import { Binding, ComponentCompSchema, Dictionary, EventBindingSchema, EventBindingType } from '../model/types'

import { ROOT_ID } from '@/constants/common'
import { findEntities } from '@/lib/entity-actions'
import { rootWrapArr } from '@/lib/structure-validators'

export function assertCompSchema(input: unknown): asserts input is ComponentCompSchema {
  if (isObject(input) && 'componenName' in input && input.componenName === null) {
    throw Error('is not a CompSchema type')
  }
}

export function assertEventBindings(input: unknown): asserts input is Dictionary<Binding> {
  const messages = {
    [EventBindingType.EVENT]: 'event cannot be a child',
    [EventBindingType.ACTION]: 'action must be a child of an event',
    [EventBindingType.EVENT_ASSERTION]: 'assertion must be a child of an action or operator',
    [EventBindingType.OPERATOR]: 'operator must be a child of an action or operator',
    [EventBindingType.ROOT]: 'root must be a root',
  }

  const validateBindingUnit = rootWrapArr(
    or(
      {
        data: {
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
    const eventBindingSchema = (input as unknown) as EventBindingSchema
    const { data } = eventBindingSchema

    const rootBinding = data[ROOT_ID]

    if (rootBinding === undefined) {
      throw new Error('Root cannot be undefined')
    }
    if (rootBinding.children === undefined) {
      throw new Error('Root cannot must have children')
    }

    const eventUnits = findEntities(rootBinding.children, data)

    Object.values(eventUnits).forEach((eventUnit) => {
      if (eventUnit.type !== EventBindingType.EVENT) {
        throw new ValidationError({
          inputName: eventUnit.id,
          code: assertEventBindings.name,
          path: eventUnit.id,
          message: messages[eventUnit.type],
        })
      }

      const actionUnits = findEntities(eventUnit.children || [], data)

      Object.values(actionUnits).forEach((actionUnit) => {
        if (actionUnit.type !== EventBindingType.ACTION) {
          throw new ValidationError({
            inputName: actionUnit.id,
            code: assertEventBindings.name,
            path: actionUnit.id,
            message: messages[actionUnit.type],
          })
        }

        const assertionUnits = findEntities(actionUnit.children || [], data)

        Object.values(assertionUnits).forEach((assertionUnit) => {
          if (
            assertionUnit.type !== EventBindingType.EVENT_ASSERTION &&
            assertionUnit.type !== EventBindingType.OPERATOR
          ) {
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
