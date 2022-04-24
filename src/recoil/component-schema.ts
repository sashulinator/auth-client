import { selectedSchemaItemState } from './form-schema'
import { atom, selector } from 'recoil'

import { ComponentSchema } from '@/types/entities'

export const componentSchemaData = [
  {
    id: 'ee4254ef-9099-4243-be68-51ce733b3376',
    name: 'PrimaryButton',
    title: 'Button',
    description: 'button',
    schema: [
      {
        id: 'ee4254ef-9099-8943-be68-51ce733b390',
        componentSchemaId: 'ee4254ef-9099-8943-be68-51ce733b870',
        path: 'children[0]',
        name: 'TextField',
        type: 'input',
        props: {
          placeholder: 'надпись',
        },
      },
      {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        componentSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
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
        componentSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        path: 'props.horizontal',
        name: 'Checkbox',
        type: 'input',
        props: {
          label: 'горизонтально',
        },
      },
      {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
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
        componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        path: 'path',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'путь',
        },
      },
      {
        id: 'rr4254ef-9099-5643-be68-51ce733b3360',
        componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        path: 'defaultValue',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'значение по умолчанию',
        },
      },
    ],
  },
]

export const componentSchemaState = atom({
  key: 'componentSchemaState',
  default: componentSchemaData.reduce<Record<string, ComponentSchema>>((acc, schemaItem) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acc[schemaItem.id] = schemaItem
    return acc
  }, {}),
})

export const selectedComponentSchemaState = selector({
  key: 'selectedComponentSchemaState',
  get: ({ get }) => {
    const componentSchemas = get(componentSchemaState)
    const selectedSchemaItem = get(selectedSchemaItemState)

    if (selectedSchemaItem) {
      return componentSchemas[selectedSchemaItem.componentSchemaId]
    }

    return null
  },
})
