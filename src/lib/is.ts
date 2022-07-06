import { isString, string } from '@savchenko91/schema-validator'

import { objectWithNumberKeys, rootWrap } from './structure-validators'

// перенести в либу
export function isStringifiedNumber(input: unknown): input is `${number}` {
  if (isString(input)) {
    return input === parseInt(input).toString()
  }
  return false
}

export function isStringArray(input: unknown): input is string[] {
  const errors = rootWrap([string])(input)
  return !errors
}

export function isObjectWithNumberKeys(input: unknown): input is string[] {
  const errors = rootWrap(objectWithNumberKeys({}))(input)
  return !errors
}

export function isArrayOfStringArrays(input: unknown): input is [string, string][] {
  const errors = rootWrap([[string]])(input)
  return !errors
}
