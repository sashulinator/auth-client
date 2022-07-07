import { IDropdownOption } from '@fluentui/react'
import { isObject, number, or, string } from '@savchenko91/schema-validator'

import { isArrayOfStringArrays, isObjectWithNumberKeys, isStringArray, isTrie } from './is'
import { rootWrap } from './structure-validators'

export function generateOptionsFromObject(object: Record<string, unknown>): IDropdownOption[] {
  return generateOptionsFromStringArray(Object.keys(object))
}

export function generateOptionsFromArrayOfStringArrays(arrayOfArrays: [string, string][]): IDropdownOption[] {
  return arrayOfArrays?.map((option: [string, string]) => {
    return {
      key: option?.[0],
      text: option?.[1],
    }
  })
}

export function generateOptionsFromStringArray(arr: string[], t?: (s: string) => string): IDropdownOption[] {
  return arr.map((string) => ({
    text: t ? t(string.toString()) : string,
    key: string,
  }))
}

export function generateOptionsFromUnknown(options: unknown): IDropdownOption[] {
  if (isObjectWithNumberKeys(options)) {
    return generateOptionsFromUnknown(Object.values(options))
  }

  if (isDropdownOptions(options)) {
    return options
  }

  if (isStringArray(options)) {
    return generateOptionsFromStringArray(options)
  }

  if (isArrayOfStringArrays(options)) {
    return generateOptionsFromArrayOfStringArrays(options)
  }

  if (isTrie(options)) {
    return Object.entries(options).map(([key, text]) => ({ text, key }))
  }

  if (isObject(options)) {
    return generateOptionsFromObject(options)
  }

  return []
}

// Private

function isDropdownOptions(input: unknown): input is IDropdownOption[] {
  const validator = rootWrap([
    {
      key: or(string, number),
      text: string,
    },
  ])

  const error = validator(input)

  return !error
}
