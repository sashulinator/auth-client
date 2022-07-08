import {
  assertMatchPattern,
  assertNotUndefined,
  assertNull,
  assertString,
  assertUndefined,
} from '@savchenko91/schema-validator'

import { assertEventBindings } from '../lib/assertions'
import { AssertionBindingMeta, CompSchemaType, Dictionary } from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'
import { MUTATE_ALL_FORM_VALUES_TO_STRING } from './constants'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const assertionList: Dictionary<AssertionBindingMeta> = {
  eventBindings: {
    function: assertEventBindings,
  },
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
      type: CompSchemaType.FORM,
      data: {
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

export const assertionNameOptions = generateOptionsFromObject(assertionList)
