import { Schema } from '@/types/form-constructor'

export const compSchemaMock: Record<string, Schema> = {
  'ee4254ef-9099-4243-be68-51ce733b3376': {
    id: 'ee4254ef-9099-4243-be68-51ce733b3376',
    name: 'PrimaryButton',
    title: 'Button',
    description: 'button',
    schema: {
      'ee4254ef-9099-8943-be68-51ce733b390': {
        id: 'ee4254ef-9099-8943-be68-51ce733b390',
        name: 'ТестИнпут1',
        componentName: 'TextField',
        componentSchemaId: 'ee4254ef-9099-8943-be68-51ce733b870',
        path: 'props.children',
        type: 'input',
        props: {
          placeholder: 'надпись',
        },
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        name: 'ТестЧекбокс1',
        componentName: 'Checkbox',
        componentSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        path: 'props.disabled',
        type: 'checkbox',
        props: {
          label: 'неактивный',
        },
      },
    },
  },
  'ee4254ef-9099-4289-be68-51ce733b3376': {
    id: 'ee4254ef-9099-4289-be68-51ce733b3376',
    name: 'Stack',
    title: 'Stack',
    description: 'stack',
    schema: {
      'ee4254ef-9099-5sd3-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5sd3-be68-51ce733b3367',
        componentSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        componentName: 'Checkbox',
        path: 'props.horizontal',
        name: 'Checkbox',
        type: 'checkbox',
        props: {
          label: 'горизонтально',
        },
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        componentName: 'TextField',
        path: 'props.tokens.padding',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'отступ',
        },
      },
    },
  },
  'ee4234ef-9099-8943-8968-51ce733b870': {
    id: 'ee4234ef-9099-8943-8968-51ce733b870',
    name: 'TextField',
    title: 'TextField',
    description: 'text input',
    schema: {
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        componentName: 'TextField',
        path: 'path',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'путь',
        },
      },
      'rr4254ef-9099-5643-be68-51ce733b3360': {
        id: 'rr4254ef-9099-5643-be68-51ce733b3360',
        componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        path: 'defaultValue',
        componentName: 'TextField',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'значение по умолчанию',
        },
      },
    },
  },
}
