import { IDropdownOption } from '@fluentui/react/lib/Dropdown'
import { isObject } from '@savchenko91/schema-validator'

import { isDropdownOptions } from './is-dropdown-options'
import fromArrayOfArrays from './options-from-array-of-arrays'
import fromStringArray from './options-from-string-array'

import { isStringArray, isStringArrayArray } from '@/lib/is'

type Options = Record<string, [string, string]> | string[] | IDropdownOption[] | [string, string][]

export default function normalizeOptions(options: Options): IDropdownOption[] {
  if (isObject(options)) {
    const arrOptions = Object.values(options)

    if (isDropdownOptions(arrOptions)) {
      return fromArrayOfArrays(arrOptions)
    } else {
      return normalizeOptions(arrOptions)
    }
  }

  if (isStringArray(options)) {
    return fromStringArray(options)
  }

  if (isStringArrayArray(options)) {
    return options.map((option) => ({
      key: option[0],
      text: option[1],
    }))
  }

  if (isDropdownOptions(options)) {
    return options
  }

  return []
}
