import { ActionButton, IconButton, Label, Link, PrimaryButton, SearchBox, Text } from '@fluentui/react'

import { generateOptionsFromObject } from '@/lib/generate-options'
import ValidatorPicker from '@/shared/assertion-binding-editor'
import { Button } from '@/shared/button'
import { Checkbox, MultiCheckbox } from '@/shared/checkbox'
import Collapse from '@/shared/collapse'
import DatePicker from '@/shared/date-picker/date-picker'
import { Dropdown, DropdownMultipleSelect } from '@/shared/dropdown'
import EventBindingEditor from '@/shared/event-binding-editor'
import Fetcher from '@/shared/fetcher'
import Portal from '@/shared/header-portal'
import HorizontalLine from '@/shared/horizontal-line'
import JSONEditor from '@/shared/json-editor'
import CustomNumberField from '@/shared/numberfield'
import { Pivot, PivotItem } from '@/shared/pivot'
import { BasicComponentsNames, CompMeta } from '@/shared/schema-drawer'
import Stack from '@/shared/stack'
import Table from '@/shared/table'
import CustomTextField from '@/shared/textfield'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentList: Record<string, CompMeta> = {
  // Utils

  ValidatorPicker: {
    type: 'input',
    component: ValidatorPicker,
    iconName: 'Robot',
  },

  // Checkboxes

  [BasicComponentsNames.Checkbox]: {
    type: 'checkbox',
    component: Checkbox,
    iconName: 'CheckboxComposite',
  },

  // Inputs

  [BasicComponentsNames.TextField]: {
    type: 'input',
    component: CustomTextField,
    iconName: 'TextField',
  },

  [BasicComponentsNames.NumberField]: {
    type: 'input',
    component: CustomNumberField,
    iconName: 'NumberField',
  },

  DatePicker: {
    type: 'input',
    iconName: 'DateTime',
    component: DatePicker,
  },

  EventBindingEditor: {
    type: 'input',
    component: EventBindingEditor,
    iconName: 'TouchPointer',
  },

  Fetcher: {
    type: 'input',
    component: Fetcher,
    iconName: 'OpenFile',
  },

  JSONEditor: {
    type: 'input',
    component: JSONEditor,
    iconName: 'FileCode',
  },

  [BasicComponentsNames.Dropdown]: {
    type: 'input',
    component: Dropdown,
    iconName: 'Dropdown',
  },

  DropdownMultipleSelect: {
    type: 'input',
    component: DropdownMultipleSelect,
    iconName: 'Dropdown',
  },

  MultiCheckbox: {
    type: 'input',
    component: MultiCheckbox,
    iconName: 'MultiSelect',
  },

  // Contents

  Button: {
    type: 'content',
    component: Button,
    iconName: 'ButtonControl',
  },

  Portal: {
    type: 'content',
    component: Portal,
    iconName: 'Sprint',
  },

  [BasicComponentsNames.Stack]: {
    type: 'content',
    component: Stack,
    iconName: 'Stack',
  },

  Collapse: {
    type: 'content',
    component: Collapse,
    iconName: 'NavigationFlipper',
  },

  HorizontalLine: {
    type: 'content',
    component: HorizontalLine,
    iconName: 'Remove',
  },

  PrimaryButton: {
    type: 'content',
    component: PrimaryButton,
    iconName: 'ButtonControl',
  },

  Text: {
    type: 'content',
    component: Text,
    iconName: 'TextOverflow',
  },

  Link: {
    type: 'content',
    component: Link,
    iconName: 'Link',
  },

  Table: {
    type: 'content',
    component: Table,
    iconName: 'Table',
  },

  Label: {
    type: 'content',
    component: Label,
    iconName: 'Label',
  },

  Pivot: {
    type: 'content',
    component: Pivot,
    iconName: 'BrowserTab',
  },

  PivotItem: {
    type: 'content',
    component: PivotItem,
    iconName: 'TabOneColumn',
  },

  IconButton: {
    type: 'content',
    component: IconButton,
    iconName: 'ButtonControl',
  },

  ActionButton: {
    type: 'content',
    component: ActionButton,
    iconName: 'ButtonControl',
  },

  SearchBox: {
    type: 'content',
    component: SearchBox,
    iconName: 'Search',
  },
}

export const componentNameOptions = generateOptionsFromObject(componentList).sort((optA, optB) =>
  optA.text > optB.text ? 1 : -1
)

export default componentList
