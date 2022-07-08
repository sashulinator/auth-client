import { createCatalog } from '../lib/create-catalog'
import { assertMatchPattern, assertUndefined, assertVisited } from '../lib/event-assertions'
import { generateSimpleCompsSchema } from '../lib/generate-simple-comps-schema'
import {
  AssertionBindingType,
  CompSchemaType,
  Dictionary,
  EventAssertionBindingMeta,
  EventAssertionBindingMetaName,
  EventToShowError,
} from '../model/types'
import { BasicComponentsNames } from './basic-components-schemas'

const eventAssertionBindingMetaList: EventAssertionBindingMeta[] = [
  {
    name: EventAssertionBindingMetaName.undefined,
    function: assertUndefined,
    schema: generateSimpleCompsSchema([
      {
        id: 'namesDropdown',
        name: 'name',
        props: { label: 'name' },
        compSchemaId: BasicComponentsNames.Dropdown,
        injections: [
          {
            from: 'context.previewData.names',
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
      {
        id: 'isInit',
        name: 'isInit',
        props: { label: 'initial value' },
        compSchemaId: BasicComponentsNames.Checkbox,
      },
    ]),
  },
  {
    name: EventAssertionBindingMetaName.visited,
    function: assertVisited,
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
          props: { tokens: { padding: '8px', childrenGap: '24px' } },
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
    name: EventAssertionBindingMetaName.matchPattern,
    function: assertMatchPattern,
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
          children: ['pattern', 'namesDropdown'],
          props: {
            tokens: {
              padding: '8px',
            },
          },
          compSchemaId: BasicComponentsNames.Stack,
        },
        pattern: {
          id: 'pattern',
          title: 'pattern',
          name: 'pattern',
          props: { label: 'pattern' },
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
]

const eventAssertionBindingMetaCatalog: Dictionary<EventAssertionBindingMeta> = createCatalog(
  eventAssertionBindingMetaList,
  'name'
)

export { eventAssertionBindingMetaCatalog }
