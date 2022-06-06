import { IDropdownOption } from '@fluentui/react'
import { isObject, number, or, string } from '@savchenko91/schema-validator'

import { isArrayOfStringArrays, isStringArray } from './is'

import { rootOnly } from '@/lib/validators'

export function generateOptionsFromObject(object: Record<string, unknown>) {
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

export function generateOptionsFromStringArray(arr: string[], t?: (s: string) => string) {
  return arr.map((string) => ({
    text: t ? t(string.toString()) : string,
    key: string,
  }))
}

export function generateOptionsFromUnknown(options: unknown): IDropdownOption[] {
  if (isDropdownOptions(options)) {
    return options
  }

  if (isObject(options)) {
    generateOptionsFromObject(options)
  }

  if (isStringArray(options)) {
    return generateOptionsFromStringArray(options)
  }

  if (isArrayOfStringArrays(options)) {
    return generateOptionsFromArrayOfStringArrays(options)
  }

  return []
}

// Private

function isDropdownOptions(input: unknown): input is IDropdownOption[] {
  const validator = rootOnly([
    {
      key: or(string, number),
      text: string,
    },
  ])

  const error = validator(input)

  return !error
}
