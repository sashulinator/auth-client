import { IDropdownOption } from '@fluentui/react'

import { DrawerContext } from '../model/types'
import { ComponentNames } from './assertion-list'

import { FormType, Norm, Schema } from '@/entities/schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(context: DrawerContext, props?: any) {
  if (props.difference[props.name]) {
    context.formProps.form.change(props.name, props.difference[props.name])
  }
}

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
      type: FormType.FORM,
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
  test: {
    name: 'test',
    function: setValue,
  },
}

export default actionList

export const actionNameOptions: IDropdownOption[] = Object.keys(actionList).map((actionName) => {
  return {
    key: actionName,
    text: actionName,
  }
})
