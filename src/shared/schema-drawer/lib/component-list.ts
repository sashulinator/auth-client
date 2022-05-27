import {
  ActionButton,
  Checkbox,
  IDropdownOption,
  IconButton,
  Label,
  Link,
  PrimaryButton,
  SearchBox,
  Stack,
  Text,
} from '@fluentui/react'

import { ComponentNames } from '../model/types'

import BindingPicker from '@/shared/binding-setter'
import Collapse from '@/shared/collapse'
import CustomDatePicker from '@/shared/date-picker'
import { Dropdown, DropdownMultipleSelect } from '@/shared/dropdown'
import Fetcher from '@/shared/fetcher'
import JSONEditor from '@/shared/json-editor'
import MultiCheckbox from '@/shared/multicheckbox'
import CustomNumberField from '@/shared/numberfield'
import { Pivot, PivotItem } from '@/shared/pivot'
import Table from '@/shared/table'
import CustomTextField from '@/shared/textfield'
import ValidatorPicker from '@/shared/validator-picker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentList = {
  // Utils

  ValidatorPicker: {
    type: 'input',
    component: ValidatorPicker,
  },

  // Checkboxes

  Checkbox: {
    type: 'checkbox',
    component: Checkbox,
  },

  MultiCheckbox: {
    type: 'checkbox',
    component: MultiCheckbox,
  },

  // Inputs

  [ComponentNames.TextField]: {
    type: 'input',
    component: CustomTextField,
  },

  [ComponentNames.NumberField]: {
    type: 'input',
    component: CustomNumberField,
  },

  DatePicker: {
    type: 'input',
    component: CustomDatePicker,
  },

  BindingPicker: {
    type: 'input',
    component: BindingPicker,
  },

  Fetcher: {
    type: 'input',
    component: Fetcher,
  },

  JSONEditor: {
    type: 'input',
    component: JSONEditor,
  },

  Dropdown: {
    type: 'input',
    component: Dropdown,
  },

  DropdownMultipleSelect: {
    type: 'input',
    component: DropdownMultipleSelect,
  },

  // Contents

  [ComponentNames.Stack]: {
    type: 'content',
    component: Stack,
  },

  Collapse: {
    type: 'content',
    component: Collapse,
  },

  PrimaryButton: {
    type: 'content',
    component: PrimaryButton,
  },

  Text: {
    type: 'content',
    component: Text,
  },

  Link: {
    type: 'content',
    component: Link,
  },

  Table: {
    type: 'input',
    component: Table,
  },

  Label: {
    type: 'content',
    component: Label,
  },

  Pivot: {
    type: 'content',
    component: Pivot,
  },

  PivotItem: {
    type: 'content',
    component: PivotItem,
  },

  IconButton: {
    type: 'content',
    component: IconButton,
  },

  ActionButton: {
    type: 'content',
    component: ActionButton,
  },

  SearchBox: {
    type: 'content',
    component: SearchBox,
  },
} as const

// Blind???? Я хз как назвать но он типо не видит какие в нём есть ключи,
// это полезно когда пытаешь получить значения динамически
export const componentListBlind: Record<string, ComponentItem> = componentList

interface ComponentItem {
  type: 'checkbox' | 'input' | 'content'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

export const componentNameOptions: IDropdownOption[] = Object.keys(componentList).map((componentName) => {
  return {
    key: componentName,
    text: componentName,
  }
})

export default componentList
