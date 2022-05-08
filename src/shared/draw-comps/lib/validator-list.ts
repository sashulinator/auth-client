import { IDropdownOption } from '@fluentui/react'
import { assertNull, assertString, assertUndefined } from '@savchenko91/schema-validator'

import { Norm } from '@/common/types'

interface ValidatorItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validator: any
}

export const validatorList: Norm<ValidatorItem> = {
  assertString: {
    validator: assertString,
  },
  assertUndefined: {
    validator: assertUndefined,
  },
  assertNull: {
    validator: assertNull,
  },
}

export const validatorNameOptions: IDropdownOption[] = Object.keys(validatorList).map((validatorName) => {
  return {
    key: validatorName,
    text: validatorName,
  }
})
