import { ComponentNames, Item } from '../model/types'
import { _undefined } from './event-assertions'

import { Norm, SchemaType } from '@/entities/schema'
import optionsFromStringArray from '@/lib/options-from-string-array'

export const eventAssertionList: Norm<Item> = {
  undefined: {
    type: 'assertion',
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

export const eventAssertionNameOptions = optionsFromStringArray(Object.keys(eventAssertionList))
