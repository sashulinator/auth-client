import { ComponentNames, Item } from '../model/types'
import { _undefined, assertTargetInitValueUndefined } from './event-assertions'

import { Norm, SchemaType } from '@/entities/schema'
import optionsFromStringArray from '@/lib/options-from-string-array'

export const eventAssertionList: Norm<Item> = {
  targetInitValueUndefined: {
    type: 'assertion',
    function: assertTargetInitValueUndefined,
  },
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
          children: ['compsIdsDropdown'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: ComponentNames.Stack,
        },
        compsIdsDropdown: {
          id: 'compsIdsDropdown',
          title: 'compId',
          name: 'compId',
          props: { label: 'compId' },
          compSchemaId: ComponentNames.TextField,
        },
      },
    },
  },
}

export const eventAssertionNameOptions = optionsFromStringArray(Object.keys(eventAssertionList))
