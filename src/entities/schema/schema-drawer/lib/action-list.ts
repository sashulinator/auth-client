import { IDropdownOption } from '@fluentui/react'

import { setValue } from './actions'
import { ComponentNames } from './assertion-list'

import { Norm, Schema, SchemaType } from '@/entities/schema'

export interface ActionItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...ars: any[]) => any
  name: string
  schema?: Schema
}

const actionList: Norm<ActionItem> = {
  setValue: {
    name: 'setValue',
    function: setValue,
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
          children: ['name'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: ComponentNames.Stack,
        },
        name: {
          id: 'name',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: ComponentNames.TextField,
        },
      },
    },
  },
}

export default actionList

export const actionNameOptions: IDropdownOption[] = Object.keys(actionList).map((actionName) => {
  return {
    key: actionName,
    text: actionName,
  }
})
