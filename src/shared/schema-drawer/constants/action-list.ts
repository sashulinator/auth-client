import { hide, setCompProp, setValue } from '../lib/actions'
import { createCatalog } from '../lib/create-catalog'
import {
  ActionBindingMeta,
  AssertionBindingType,
  CompSchemaType,
  Dictionary,
  EventBindingType,
  EventToShowError,
} from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const actionList: ActionBindingMeta[] = [
  {
    name: 'hide',
    function: hide,
    schema: {
      id: '7021a575-562a-42f8-a640-4292afb2977e',
      title: 'Training',
      componentName: null,
      type: CompSchemaType.FORM,
      data: {
        ROOT_ID: {
          id: 'ROOT_ID',
          props: {
            tokens: {
              padding: '8px',
              childrenGap: '8',
            },
          },
          title: 'stackRoot',
          children: ['l44hsywr'],
          compSchemaId: BasicComponentsNames.Stack,
        },
        l44hsywr: {
          id: 'l44hsywr',
          name: 'compId',
          props: {
            label: 'comp',
          },
          title: 'comp',
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.options.comps',
              to: 'props.options',
            },
          ],
          assertionBindingSchema: {
            eventToShowError: EventToShowError.onVisited,
            data: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingType.ASSERTION,
              },
            },
          },
        },
      },
    },
  },
  {
    name: 'setValue',
    function: setValue,
    schema: {
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: CompSchemaType.FORM,
      data: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['namesDropdown'],
          props: { tokens: { padding: '8px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        namesDropdown: {
          id: 'namesDropdown',
          title: 'name',
          name: 'name',
          props: { label: 'name' },
          compSchemaId: BasicComponentsNames.Dropdown,
          assertionBindingSchema: {
            eventToShowError: EventToShowError.onVisited,
            data: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingType.ASSERTION,
              },
            },
          },
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
  {
    name: 'setCompProp',
    function: setCompProp,
    schema: {
      id: '7021a575-562a-42f8-a640-4292afb2977e',
      title: 'Training',
      componentName: null,
      type: CompSchemaType.FORM,
      data: {
        ROOT_ID: {
          id: 'ROOT_ID',
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
            label: 'comp',
          },
          title: 'comp',
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.options.comps',
              to: 'props.options',
            },
          ],
          assertionBindingSchema: {
            eventToShowError: EventToShowError.onVisited,
            data: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingType.ASSERTION,
              },
            },
          },
        },
        l458ijf3: {
          id: 'l458ijf3',
          name: 'typeof',
          title: 'typeof',
          assertionBindingSchema: {
            eventToShowError: EventToShowError.onVisited,
            data: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingType.ASSERTION,
              },
            },
          },
          props: {
            label: 'typeof',
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
          },
          eventBindingSchema: {
            data: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'root',
                type: EventBindingType.ROOT,
                children: ['l459ocs7'],
              },
              l459ocs7: {
                id: 'l459ocs7',
                name: 'onFieldLife',
                type: EventBindingType.EVENT,
                children: ['l45ikto6', 'l45im2fr', 'l45givi5', 'l459q4jl'],
              },
              l459q4jl: {
                id: 'l459q4jl',
                name: setCompProp.name,
                type: EventBindingType.ACTION,
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
                type: EventBindingType.EVENT_ASSERTION,
                props: {
                  name: 'typeof',
                  pattern: 'boolean',
                },
              },
              l45givi5: {
                id: 'l45givi5',
                name: setCompProp.name,
                type: EventBindingType.ACTION,
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
                type: EventBindingType.EVENT_ASSERTION,
                props: {
                  name: 'typeof',
                  pattern: 'string',
                },
              },
              l45ikto6: {
                id: 'l45ikto6',
                name: setCompProp.name,
                type: EventBindingType.ACTION,
                props: {
                  prop: 'props.hidden',
                  compId: 'l45gg3ha',
                  typeof: 'boolean',
                  booleanValue: true,
                },
              },
              l45im2fr: {
                id: 'l45im2fr',
                name: setCompProp.name,
                type: EventBindingType.ACTION,
                props: {
                  prop: 'props.hidden',
                  compId: 'l458n3rr',
                  typeof: 'boolean',
                  booleanValue: true,
                },
              },
            },
          },
          compSchemaId: BasicComponentsNames.Dropdown,
          defaultValue: 'boolean',
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
          name: 'booleanValue',
          defaultValue: false,
          props: {
            label: 'value',
            defaultValue: false,
            dontConverFalseToUndefined: true,
          },
          title: 'value',
          compSchemaId: BasicComponentsNames.Checkbox,
        },
        l45am25m: {
          id: 'l45am25m',
          name: 'prop',
          props: {
            label: 'prop name',
          },
          title: 'prop name',
          compSchemaId: BasicComponentsNames.TextField,
          assertionBindingSchema: {
            eventToShowError: EventToShowError.onVisited,
            data: {
              ROOT_ID: {
                id: 'ROOT_ID',
                name: 'and',
                type: AssertionBindingType.OPERATOR,
                children: ['l46vi95c'],
              },
              l46vi95c: {
                id: 'l46vi95c',
                name: 'string',
                type: AssertionBindingType.ASSERTION,
              },
            },
          },
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
          name: 'stringValue',
          title: 'TextField',
          props: {
            label: 'value',
          },
          compSchemaId: BasicComponentsNames.TextField,
        },
      },
    },
  },
]

export const actionDictionary: Dictionary<ActionBindingMeta> = createCatalog(actionList, 'name')

export const actionNameOptions = generateOptionsFromObject(actionDictionary)
