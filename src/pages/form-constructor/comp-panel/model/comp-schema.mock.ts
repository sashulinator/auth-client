import { ROOT_COMP_ID } from '@/constants/common'
import { Schema } from '@/types/form-constructor'

export const compSchemaMock: Record<string, Schema> = {
  'ee4254ef-9099-4243-be68-51ce733b3376': {
    id: 'ee4254ef-9099-4243-be68-51ce733b3376',
    name: 'PrimaryButton',
    title: 'Button',
    description: 'button',
    comps: {
      [ROOT_COMP_ID]: {
        id: ROOT_COMP_ID,
        name: 'stackRoot',
        compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
        compName: 'Stack',
        path: 'hello',
        type: 'component',
        props: {
          tokens: {
            // childrenGap: 10,
          },
        },
        childCompIds: ['ee4254ef-9099-8943-be68-51ce733b390', 'ee4254ef-9099-5543-be68-51ce733b3367'],
      },
      'ee4254ef-9099-8943-be68-51ce733b390': {
        id: 'ee4254ef-9099-8943-be68-51ce733b390',
        name: 'ТестИнпут1',
        compName: 'TextField',
        compSchemaId: 'ee4254ef-9099-8943-be68-51ce733b870',
        path: 'props.children',
        type: 'input',
        props: {
          placeholder: 'надпись',
        },
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        name: 'ТестЧекбокс1',
        compName: 'Checkbox',
        compSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        path: 'props.disabled',
        type: 'checkbox',
        props: {
          label: 'неактивный',
        },
      },
    },
  },
  textCompSchemaId: {
    id: 'textCompSchemaId',
    name: 'Text',
    title: 'Text',
    description: 'button',
    comps: {
      [ROOT_COMP_ID]: {
        id: ROOT_COMP_ID,
        name: 'stackRoot',
        compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
        compName: 'Stack',
        path: 'hello',
        type: 'component',
        props: {
          tokens: {
            // childrenGap: 10,
          },
        },
        childCompIds: ['ee4254ef-9099-8943-be68-51ce733b390', 'ee4254ef-9099-5543-be68-51ce733b3367'],
      },
      'ee4254ef-9099-8943-be68-51ce733b390': {
        id: 'ee4254ef-9099-8943-be68-51ce733b390',
        name: 'ТестИнпут1',
        compName: 'TextField',
        compSchemaId: 'ee4254ef-9099-8943-be68-51ce733b870',
        path: 'props.children',
        type: 'input',
        props: {
          placeholder: 'надпись',
        },
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        name: 'ТестЧекбокс1',
        compName: 'Checkbox',
        compSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        path: 'props.disabled',
        type: 'checkbox',
        props: {
          label: 'неактивный',
        },
      },
    },
  },
  checkboxCompSchemaId: {
    id: 'checkboxCompSchemaId',
    name: 'Checkbox',
    title: 'Checkbox',
    description: 'checkbox',
    comps: {
      [ROOT_COMP_ID]: {
        id: ROOT_COMP_ID,
        name: 'stackRoot',
        compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
        compName: 'Stack',
        path: 'hello',
        type: 'component',
        props: {
          tokens: {
            // childrenGap: 10,
          },
        },
        childCompIds: ['ee4254ef-9099-5543-be68-51ce733b3367'],
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        name: 'ТестЧекбокс1',
        compName: 'Checkbox',
        compSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
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
    comps: {
      [ROOT_COMP_ID]: {
        id: ROOT_COMP_ID,
        name: 'stackRoot',
        compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
        compName: 'Stack',
        path: 'hello',
        type: 'component',
        props: {
          tokens: {
            // childrenGap: 10,
          },
        },
        childCompIds: ['ee4254ef-9099-5sd3-be68-51ce733b3367', 'ee4254ef-9099-5543-be68-51ce733b3367'],
      },
      'ee4254ef-9099-5sd3-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5sd3-be68-51ce733b3367',
        compSchemaId: 'ee4254ef-9099-8943-8968-51ce733b870',
        compName: 'Checkbox',
        path: 'props.horizontal',
        name: 'Checkbox',
        type: 'checkbox',
        props: {
          label: 'горизонтально',
        },
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        compSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        compName: 'TextField',
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
    comps: {
      [ROOT_COMP_ID]: {
        id: ROOT_COMP_ID,
        name: 'stackRoot',
        compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
        compName: 'Stack',
        path: 'hello',
        type: 'component',
        props: {
          tokens: {
            // childrenGap: 10,
          },
        },
        childCompIds: ['ee4254ef-9099-5543-be68-51ce733b3367', 'rr4254ef-9099-5643-be68-51ce733b3360'],
      },
      'ee4254ef-9099-5543-be68-51ce733b3367': {
        id: 'ee4254ef-9099-5543-be68-51ce733b3367',
        compSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        compName: 'TextField',
        path: 'path',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'путь',
        },
      },
      'rr4254ef-9099-5643-be68-51ce733b3360': {
        id: 'rr4254ef-9099-5643-be68-51ce733b3360',
        compSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
        path: 'defaultValue',
        compName: 'TextField',
        name: 'TextField',
        type: 'input',
        props: {
          label: 'значение по умолчанию',
        },
      },
    },
  },
}
