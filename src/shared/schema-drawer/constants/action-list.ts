import { changeComponentProp, setValue } from '../lib/actions'
import { ActionListItem, EventUnitType, Norm, SchemaType } from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const actionList: Norm<ActionListItem> = {
  [setValue.name]: {
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
  [changeComponentProp.name]: {
    function: changeComponentProp,
    schema: {
      id: '7021a575-562a-42f8-a640-4292afb2977e',
      title: 'Training',
      componentName: null,
      type: SchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          name: 'noname',
          props: {
            tokens: {
              padding: '8px',
              childrenGap: '8',
            },
          },
          title: 'stackRoot',
          children: ['l44hsywr', 'l45am25m', 'l458ijf3', 'l458n3rr', 'l45gg3ha'],
          compSchemaId: BasicComponentsNames.Stack,
        },
        l44hsywr: {
          id: 'l44hsywr',
          name: 'compId',
          props: {
            label: 'compId',
          },
          title: 'compId',
          compSchemaId: BasicComponentsNames.TextField,
        },
        l458ijf3: {
          id: 'l458ijf3',
          name: 'typeof',
          props: {
            options: [
              {
                key: 'boolean',
                text: 'boolean',
              },
              {
                key: 'string',
                text: 'string',
              },
            ],
            placeholder: 'Выберите значение',
          },
          title: 'typeof',
          bindings: {
            ROOT_ID: {
              id: 'ROOT_ID',
              name: 'root',
              type: EventUnitType.ROOT,
              children: ['l459ocs7'],
            },
            l459ocs7: {
              id: 'l459ocs7',
              name: 'onFieldChange',
              type: EventUnitType.EVENT,
              children: ['l45ikto6', 'l45im2fr', 'l45givi5', 'l459q4jl'],
            },
            l459q4jl: {
              id: 'l459q4jl',
              name: 'changeComponentProp',
              type: EventUnitType.ACTION,
              props: {
                prop: 'props.hidden',
                compId: 'l458n3rr',
                typeof: 'boolean',
                booleanValue: false,
              },
              children: ['l45agej6'],
            },
            l45agej6: {
              id: 'l45agej6',
              name: 'matchPattern',
              type: EventUnitType.ASSERTION,
              props: {
                name: 'typeof',
                pattern: 'boolean',
              },
            },
            l45givi5: {
              id: 'l45givi5',
              name: 'changeComponentProp',
              type: EventUnitType.ACTION,
              props: {
                prop: 'props.hidden',
                compId: 'l45gg3ha',
                typeof: 'boolean',
                booleanValue: false,
              },
              children: ['l45glrdh'],
            },
            l45glrdh: {
              id: 'l45glrdh',
              name: 'matchPattern',
              type: EventUnitType.ASSERTION,
              props: {
                name: 'typeof',
                pattern: 'string',
              },
            },
            l45ikto6: {
              id: 'l45ikto6',
              name: 'changeComponentProp',
              type: EventUnitType.ACTION,
              props: {
                prop: 'props.hidden',
                compId: 'l45gg3ha',
                typeof: 'boolean',
                booleanValue: true,
              },
            },
            l45im2fr: {
              id: 'l45im2fr',
              name: 'changeComponentProp',
              type: EventUnitType.ACTION,
              props: {
                prop: 'props.hidden',
                compId: 'l458n3rr',
                typeof: 'boolean',
                booleanValue: true,
              },
            },
          },
          compSchemaId: BasicComponentsNames.Dropdown,
        },
        l458n3rr: {
          id: 'l458n3rr',
          name: 'l458n3rs',
          props: {
            hidden: true,
            tokens: {
              padding: '0',
            },
          },
          title: 'Stack boolean',
          children: ['l458nm4r'],
          compSchemaId: BasicComponentsNames.Stack,
        },
        l458nm4r: {
          id: 'l458nm4r',
          name: 'value',
          props: {
            label: 'value',
          },
          title: 'value',
          compSchemaId: BasicComponentsNames.Checkbox,
        },
        l45am25m: {
          id: 'l45am25m',
          name: 'propname',
          props: {
            label: 'propname',
          },
          title: 'propname',
          compSchemaId: BasicComponentsNames.TextField,
        },
        l45gg3ha: {
          id: 'l45gg3ha',
          name: 'l45gg3hb',
          props: {
            hidden: true,
            tokens: {
              padding: '0',
            },
          },
          title: 'Stack string',
          children: ['l45ggn2c'],
          compSchemaId: BasicComponentsNames.Stack,
        },
        l45ggn2c: {
          id: 'l45ggn2c',
          name: 'l45ggn2d',
          title: 'TextField',
          compSchemaId: BasicComponentsNames.TextField,
        },
      },
    },
  },
}

export const actionNameOptions = generateOptionsFromObject(actionList)
