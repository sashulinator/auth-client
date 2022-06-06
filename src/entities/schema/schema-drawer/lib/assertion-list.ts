import { IDropdownOption } from '@fluentui/react'
import {
  assertMatchPattern,
  assertNotUndefined,
  assertNull,
  assertString,
  assertUndefined,
} from '@savchenko91/schema-validator'

import { BasicComponentsNames, MUTATE_ALL_FORM_VALUES_TO_STRING, Norm, Schema, SchemaType } from '../..'

import { generateOptionsFromObject } from '@/lib/generate-options'

// import { assertMatchPattern } from './custom-assertions'

export interface AssertionItem {
  function: (input: unknown, values: any) => void
  schema?: Schema
}

export const assertionList: Norm<AssertionItem> = {
  string: {
    function: assertString,
  },
  undefined: {
    function: assertUndefined,
  },
  notUndefined: {
    function: assertNotUndefined,
  },
  null: {
    function: assertNull,
  },
  matchPattern: {
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
          compSchemaId: BasicComponentsNames.Stack,
        },
        pattern: {
          id: 'pattern',
          title: 'pattern',
          name: MUTATE_ALL_FORM_VALUES_TO_STRING,
          props: { label: 'pattern' },
          compSchemaId: BasicComponentsNames.TextField,
        },
      },
    },
  },
}

export const assertionNameOptions: IDropdownOption[] = generateOptionsFromObject(assertionList)
