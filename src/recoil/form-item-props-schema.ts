import { selectedSchemaItemState } from './form-schema'
import { atom, selector } from 'recoil'

import { SchemaItem } from '@/types/entities'

export interface FormItemPropsSchema {
  id: string
  name: string
  title: string
  actions: string[]
  events: string[]
  description: string
  schema: SchemaItem[]
}

export const formItemPropsSchemaData = [
  {
    id: 'ee4254ef-9099-4243-be68-51ce733b3376',
    name: 'PrimaryButton',
    title: 'Button',
    description: 'button',
    schema: [
      {
        id: 'ee4254ef-9099-8943-be68-51ce733b390',
        formItemPropsSchemaId: 'ee4254ef-9099-8943-be68-51ce733b870',
        path: 'children[0]',
        name: 'TextField',
        type: 'input',
        props: {
          placeholder: 'надпись',
        },
      },
      {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        formItemPropsSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        path: 'props.disabled',
        name: 'Checkbox',
        type: 'input',
        props: {
          label: 'неактивный',
        },
      },
    ],
  },
  {
    id: 'ee4254ef-9099-4289-be68-51ce733b3376',
    name: 'Stack',
    title: 'Stack',
    description: 'stack',
    schema: [
      {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        formItemPropsSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        path: 'props.horizontal',
        name: 'Checkbox',
        type: 'input',
        props: {
          label: 'горизонтально',
        },
      },
      {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        formItemPropsSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        path: 'props.tokens.padding',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'отступ',
        },
      },
    ],
  },
  {
    id: 'ee4234ef-9099-8943-8968-51ce733b870',
    name: 'TextField',
    title: 'TextField',
    description: 'text input',
    events: ['onClick', 'onChange'],
    actions: ['setValue'],
    schema: [
      {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        formItemPropsSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        path: 'path',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'путь',
        },
      },
    ],
  },
]

export const formItemPropsSchemaState = atom({
  key: 'formItemPropsSchemaState',
  default: formItemPropsSchemaData.reduce<Record<string, FormItemPropsSchema>>((acc, schemaItem) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acc[schemaItem.id] = schemaItem
    return acc
  }, {}),
})

export const selectedFormItemPropsSchemaState = selector({
  key: 'selectedFormItemPropsSchemaState',
  get: ({ get }) => {
    const formItemPropsSchemas = get(formItemPropsSchemaState)
    const selectedSchemaItem = get(selectedSchemaItemState)

    if (selectedSchemaItem) {
      return formItemPropsSchemas[selectedSchemaItem.formItemPropsSchemaId]
    }

    return null
  },
})
