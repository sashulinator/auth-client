import { IDropdownOption } from '@fluentui/react'
import { number, or, string } from '@savchenko91/schema-validator'

import { rootOnly } from '@/lib/validators'

export function isDropdownOptions(input: unknown): input is IDropdownOption[] {
  const validator = rootOnly([
    {
      key: or(string, number),
      text: string,
    },
  ])

  const error = validator(input)

  return !error
}
