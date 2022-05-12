import { IDropdownOption } from '@fluentui/react/lib/Dropdown'
import { isObject } from '@savchenko91/schema-validator'

import { isDropdownOptions } from './is-dropdown-options'
import fromArrayOfArrays from './options-from-array-of-arrays'
import fromStringArray from './options-from-string-array'

import { isStringArray } from '@/lib/is'

type Options = Record<string, [string, string]> | string[] | IDropdownOption[]

export default function normalizeOptions(options: Options): IDropdownOption[] {
  if (isObject(options)) {
    const arrOptions = Object.values(options)

    if (isDropdownOptions(arrOptions)) {
      return fromArrayOfArrays(arrOptions)
    }
  }

  if (isStringArray(options)) {
    return fromStringArray(options)
  }

  if (isDropdownOptions(options)) {
    return options
  }

  return []
}
