import { IDropdownOption } from '@fluentui/react'
import { Assertion, WithAssertion, assertNull, assertString, assertUndefined } from '@savchenko91/schema-validator'

import { Norm } from '@/common/types'

type AssertionListItem =
  | {
      type: 'assertion'
      assertion: Assertion
    }
  | {
      type: 'withValue'
      assertion: WithAssertion
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: any
    }

export const assertionList: Norm<AssertionListItem> = {
  assertString: {
    type: 'assertion',
    assertion: assertString,
  },
  assertUndefined: {
    type: 'assertion',
    assertion: assertUndefined,
  },
  assertNull: {
    type: 'assertion',
    assertion: assertNull,
  },
}

export const assertionNameOptions: IDropdownOption[] = Object.keys(assertionList).map((assertionName) => {
  return {
    key: assertionName,
    text: assertionName,
  }
})
