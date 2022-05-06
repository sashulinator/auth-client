import {
  ANY_KEY,
  _null,
  and,
  buildErrorTree,
  ignorePattern,
  keyDoesNotExist,
  notEmptyString,
  only,
  or,
  string,
  withRef,
  withValue,
  wrap,
} from '@savchenko91/schema-validator'

import { assertSchemaComponentNameIsValid } from './assertions'
import { Schema } from './types'

import ErrorFromObject from '@/lib/error-from-object'

const rootOnly = only.bind({ handleError: buildErrorTree })

export const schemaValidator = rootOnly({
  componentName: or(_null, withRef('type', assertSchemaComponentNameIsValid)),
  id: string,
  name: and(string, notEmptyString, withValue(/\W+/, ignorePattern)),
  type: string,
  comps: wrap({
    [ANY_KEY]: {
      id: string,
      compSchemaId: and(string, notEmptyString),
      name: and(string, notEmptyString),
      path: or(string, keyDoesNotExist),
      defaultValue: or(string, keyDoesNotExist),
      props: or(keyDoesNotExist, {
        label: or(string, keyDoesNotExist),
      }),
      childCompIds: or([string], keyDoesNotExist),
    },
  }),
})

export function assertsSchema(input: unknown): asserts input is Schema {
  const errors = schemaValidator(input)

  // TODO фигня какая-то. Надо создать отдельную ошибку
  if (errors) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new ErrorFromObject(errors as any)
  }
}
