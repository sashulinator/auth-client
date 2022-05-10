import { IDropdownOption } from '@fluentui/react'
import {
  Assertion,
  assertNotUndefined,
  assertNull,
  assertString,
  assertUndefined,
  isObject,
} from '@savchenko91/schema-validator'

import { assertMatchPattern } from './custom-assertions'

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
          compSchemaId: ComponentNames.Stack,
        },
        pattern: {
          id: 'pattern',
          title: 'pattern',
          name: 'pattern',
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
