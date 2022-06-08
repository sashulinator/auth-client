import { changeComponentProp, setValue } from '../lib/actions'
import { ActionListItem, Norm, SchemaType } from '../model/types'
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
      id: 'hereCouldBeYourAd',
      title: 'hereCouldBeYourAd',
      componentName: null,
      type: SchemaType.FORM,
      comps: {
        ROOT_ID: {
          id: 'ROOT_ID',
          title: 'stackRoot',
          name: 'hello',
          children: ['namesDropdown', 'prop'],
          props: { tokens: { padding: '5px' } },
          compSchemaId: BasicComponentsNames.Stack,
        },
        namesDropdown: {
          id: 'compId',
          title: 'compId',
          name: 'compId',
          props: { label: 'compId' },
          compSchemaId: BasicComponentsNames.Dropdown,
          injections: [
            {
              from: 'context.previewData.compIds',
              to: 'props.options',
            },
          ],
        },
        prop: {
          id: 'prop',
          title: 'prop',
          name: 'prop',
          props: { label: 'prop' },
          compSchemaId: BasicComponentsNames.TextField,
        },
      },
    },
  },
}

export const actionNameOptions = generateOptionsFromObject(actionList)
