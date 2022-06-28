import { isObject } from '@savchenko91/schema-validator'

import { CompSchema } from '../model/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasSchema<T>(input: T | undefined): input is T & { schema: CompSchema } {
  if (isObject(input) && 'schema' in input) {
    return true
  }
  return false
}

export function isInputType<T extends { type: string } | undefined>(input: T): boolean {
  return input?.type === 'input' || input?.type === 'checkbox'
}

export function isCheckbox<T extends { type: string }>(input: T): boolean {
  return input.type === 'checkbox'
}
