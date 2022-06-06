import { ComponentNames, Item } from '../model/types'
import { _undefined, visiting } from './event-assertions'

import { Norm, SchemaType } from '@/entities/schema'
import optionsFromStringArray from '@/lib/options-from-string-array'

export const eventAssertionList: Norm<Item> = {
  undefined: {
    type: 'withValue',
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
          compSchemaId: ComponentNames.Stack,
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: ComponentNames.Dropdown,
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
          compSchemaId: ComponentNames.Checkbox,
        },
      },
    },
  },
  visiting: {
    type: 'withValue',
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
          compSchemaId: ComponentNames.Stack,
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: ComponentNames.Dropdown,
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
          compSchemaId: ComponentNames.Checkbox,
        },
      },
    },
  },
}

export const eventAssertionNameOptions = optionsFromStringArray(Object.keys(eventAssertionList))
