import { IDropdownOption } from '@fluentui/react'
import {
  Assertion,
  assertMatchPattern,
  assertNotUndefined,
  assertNull,
  assertString,
  assertUndefined,
  isObject,
} from '@savchenko91/schema-validator'

// import { assertMatchPattern } from './custom-assertions'
import { MUTATE_ALL_FORM_VALUES_TO_STRING } from '@/constants/common'
import { FormType, Norm, Schema } from '@/entities/schema'

type AssertionListItem = AssertionItem | WithValueAssertionItem

export interface AssertionItem {
  type: 'assertion'
  assertion: Assertion
}

export interface WithValueAssertionItem {
  type: 'withValue'
  // второй аргумент в ассёршене это объект который сабмитит схема
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assertion: (input: unknown, values: any) => void
  // значения схемы прилетят во второй аргумент ассёршена
  schema: Schema
}

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
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
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: FormType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['pattern'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: ComponentNames.Stack,
        },
        pattern: {
          id: 'pattern',
          title: 'pattern',
          name: MUTATE_ALL_FORM_VALUES_TO_STRING,
          props: { label: 'pattern' },
          compSchemaId: ComponentNames.TextField,
        },
      },
    },
  },
}

export function isWithValueAssertionItem(input: unknown): input is WithValueAssertionItem {
  if (isObject(input) && 'schema' in input) {
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
