import { assertUndefined, assertVisited } from '../lib/event-assertions'
import { Norm, SchemaType } from '../model/types'
import { EventAssertionListItem } from '../schema-drawer/model/types'
import { BasicComponentsNames } from './basic-components-schemas'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventAssertionList: Norm<EventAssertionListItem> = {
  undefined: {
    function: assertUndefined,
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
          children: ['namesDropdown', 'isInit'],
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
        },
        isInit: {
          id: 'isInit',
          title: 'initial value',
          name: 'isInit',
          props: { label: 'initial value' },
          compSchemaId: BasicComponentsNames.Checkbox,
        },
      },
    },
  },
  visited: {
    function: assertVisited,
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
        },
      },
    },
  },
}

export const eventAssertionNameOptions = generateOptionsFromObject(eventAssertionList)
