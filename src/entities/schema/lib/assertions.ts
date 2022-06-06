import { isObject } from '@savchenko91/schema-validator'

import { CompSchema } from '..'

export function assertCompSchema(input: unknown): asserts input is CompSchema {
  if (isObject(input) && 'componenName' in input && input.componenName === null) {
    throw Error('is not a CompSchema type')
  }
}
