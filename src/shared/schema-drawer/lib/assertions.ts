import {
  ANY_KEY,
  ValidationError,
  _undefined,
  isObject,
  keyDoesNotExist,
  or,
  string,
} from '@savchenko91/schema-validator'

import { BindingUnit, CompSchema, EventUnit, EventUnitType, Norm } from '../model/types'

import { findEntities } from '@/lib/entity-actions'
import { rootWrapArr } from '@/lib/validators'

export function assertCompSchema(input: unknown): asserts input is CompSchema {
  if (isObject(input) && 'componenName' in input && input.componenName === null) {
    throw Error('is not a CompSchema type')
  }
}

export function assertEventBindings(input: unknown): asserts input is Norm<BindingUnit> {
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

    const events = Object.values(bindings).filter((unit) => unit.type === EventUnitType.EVENT)

    if (!events.length) {
      throw new ValidationError({
        inputName: 'eventBindings',
        code: assertEventBindings.name,
        path: 'eventBindings',
        message: 'no events',
      })
    }

    events.forEach((unit) => {
      if (unit.type === EventUnitType.EVENT) {
        const actionUnits = findEntities(unit.children || [], bindings)

        Object.values(actionUnits).forEach((actionUnit) => {
          if (actionUnit.type === EventUnitType.ACTION) {
            const assertionUnits = findEntities(actionUnit.children || [], bindings)
            Object.values(assertionUnits).forEach((assertionUnit) => {
              if (assertionUnit.type === EventUnitType.ASSERTION || assertionUnit.type === EventUnitType.OPERATOR) {
                throw new ValidationError({
                  inputName: assertionUnit.id,
                  code: assertEventBindings.name,
                  path: assertionUnit.id,
                  message: 'must be an assertion',
                })
              }
            })
          } else {
            throw new ValidationError({
              inputName: actionUnit.id,
              code: assertEventBindings.name,
              path: actionUnit.id,
              message: 'must be an action',
            })
          }
        })
      }
    })
  }
}
