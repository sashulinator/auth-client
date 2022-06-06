import { IDropdownOption } from '@fluentui/react'

import { setValue } from '../lib/actions'
import { Norm, Schema, SchemaType } from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'

export interface ActionItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...ars: any[]) => any
  name: string
  schema?: Schema
}

export const actionList: Norm<ActionItem> = {
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
          children: ['namesDropdown'],
          props: { tokens: { padding: '5px' } },
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

export const actionNameOptions: IDropdownOption[] = Object.keys(actionList).map((actionName) => {
  return {
    key: actionName,
    text: actionName,
  }
})
