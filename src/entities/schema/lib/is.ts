import { isObject } from '@savchenko91/schema-validator'

import { Schema } from '../schema-drawer/model/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasSchema<T>(input: T | undefined): input is T & { schema: Schema } {
  if (isObject(input) && 'schema' in input) {
    return true
  }
  return false
}

export default function isInputType<T extends { type: string }>(input: T): boolean {
  return input.type === 'input' || input.type === 'checkbox'
}
