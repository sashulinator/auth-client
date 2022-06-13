import { assertMatchPattern, assertUndefined, assertVisited } from '../lib/event-assertions'
import { generateSimpleCompsSchema } from '../lib/generate-simple-comps-schema'
import {
  AssertionBindingItemType,
  Catalog,
  CompSchemaType,
  EventAssertionBindingMeta,
  EventToShowError,
} from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventAssertionList: Catalog<EventAssertionBindingMeta> = {
  undefined: {
    function: assertUndefined,
    schema: generateSimpleCompsSchema([
      {
        id: 'namesDropdown',
        name: 'name',
        props: { label: 'name' },
        compSchemaId: BasicComponentsNames.Dropdown,
        injections: [
          {
            from: 'context.previewData.names',
            to: 'props.options',
          },
        ],
        validators: {
          eventToShowError: EventToShowError.onVisited,
          units: {
            ROOT_ID: {
              id: 'ROOT_ID',
              name: 'and',
              type: AssertionBindingItemType.OPERATOR,
              children: ['l46vi95c'],
            },
            l46vi95c: {
              id: 'l46vi95c',
              name: 'string',
              type: AssertionBindingItemType.ASSERTION,
            },
          },
        },
      },
      {
        id: 'isInit',
        name: 'isInit',
        props: { label: 'initial value' },
        compSchemaId: BasicComponentsNames.Checkbox,
      },
    ]),
  },
  visited: {
    function: assertVisited,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: CompSchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['namesDropdown'],
          props: { tokens: { padding: '5px', childrenGap: '4px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.names',
              to: 'props.options',
            },
          ],
          validators: {
            eventToShowError: EventToShowError.onVisited,
            units: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingItemType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingItemType.ASSERTION,
              },
            },
          },
        },
      },
    },
  },
  matchPattern: {
    function: assertMatchPattern,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: CompSchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['pattern', 'namesDropdown'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        pattern: {
          id: 'pattern',
          title: 'pattern',
          name: 'pattern',
          props: { label: 'pattern' },
          compSchemaId: BasicComponentsNames.TextField,
          validators: {
            eventToShowError: EventToShowError.onVisited,
            units: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingItemType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingItemType.ASSERTION,
              },
            },
          },
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.names',
              to: 'props.options',
            },
          ],
          validators: {
            eventToShowError: EventToShowError.onVisited,
            units: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingItemType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingItemType.ASSERTION,
              },
            },
          },
        },
      },
    },
  },
}

export const eventAssertionNameOptions = generateOptionsFromObject(eventAssertionList)
