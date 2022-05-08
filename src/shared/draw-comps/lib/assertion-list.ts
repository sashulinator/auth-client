import { IDropdownOption } from '@fluentui/react'
import {
  Assertion,
  WithAssertion,
  assertMatchPattern,
  assertNotUndefined,
  assertNull,
  assertString,
  assertUndefined,
  isObject,
} from '@savchenko91/schema-validator'

import { Norm } from '@/common/types'
import TextField from '@/shared/textfield'

type AssertionListItem = AssertionItem | WithValueAssertionItem

interface AssertionItem {
  type: 'assertion'
  assertion: Assertion
}

interface WithValueAssertionItem {
  type: 'withValue'
  assertion: WithAssertion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

export const assertionList: Norm<AssertionListItem> = {
  string: {
    type: 'assertion',
    assertion: assertString,
  },
  undefined: {
    type: 'assertion',
    assertion: assertUndefined,
  },
  'not undefined': {
    type: 'assertion',
    assertion: assertNotUndefined,
  },
  null: {
    type: 'assertion',
    assertion: assertNull,
  },
  matchPattern: {
    type: 'withValue',
    assertion: assertMatchPattern,
    component: TextField,
  },
}

export function isWithValueAssertionItem(input: unknown): input is WithValueAssertionItem {
  if (isObject(input) && 'component' in input) {
    return true
  }
  return false
}

export const assertionNameOptions: IDropdownOption[] = Object.keys(assertionList).map((assertionName) => {
  return {
    key: assertionName,
    text: assertionName,
  }
})
