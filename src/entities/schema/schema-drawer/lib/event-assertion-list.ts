import { Item } from '../model/types'
import { _undefined, visiting } from './event-assertions'

import { BasicComponentsNames, Norm, SchemaType } from '@/entities/schema'
import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventAssertionList: Norm<Item> = {
  undefined: {
    function: _undefined,
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
  visiting: {
    function: visiting,
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
          children: ['namesDropdown', 'isNotVisited'],
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
        isNotVisited: {
          id: 'isNotVisited',
          title: 'not visited',
          name: 'isNotVisited',
          props: { label: 'assert not visited' },
          compSchemaId: BasicComponentsNames.Checkbox,
        },
      },
    },
  },
}

export const eventAssertionNameOptions = generateOptionsFromObject(eventAssertionList)
