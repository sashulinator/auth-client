import { IDropdownOption } from '@fluentui/react'
import {
  assertMatchPattern,
  assertNotUndefined,
  assertNull,
  assertString,
  assertUndefined,
} from '@savchenko91/schema-validator'

import { ComponentNames } from '../model/types'

// import { assertMatchPattern } from './custom-assertions'
import { MUTATE_ALL_FORM_VALUES_TO_STRING } from '@/constants/common'
import { Norm, Schema, SchemaType } from '@/entities/schema'

export interface AssertionItem {
  type: 'assertion'
  function: (input: unknown, values: any) => void
  schema?: Schema
}

export const assertionList: Norm<AssertionItem> = {
  string: {
    type: 'assertion',
    function: assertString,
  },
  undefined: {
    type: 'assertion',
    function: assertUndefined,
  },
  notUndefined: {
    type: 'assertion',
    function: assertNotUndefined,
  },
  null: {
    type: 'assertion',
    function: assertNull,
  },
  matchPattern: {
    type: 'assertion',
    function: assertMatchPattern,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: SchemaType.FORM,
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

export const assertionNameOptions: IDropdownOption[] = Object.keys(assertionList).map((assertionName) => {
  return {
    key: assertionName,
    text: assertionName,
  }
})
