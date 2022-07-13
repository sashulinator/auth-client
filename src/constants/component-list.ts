import { IconButton, Label, Link, SearchBox, Text } from '@fluentui/react'

import { generateOptionsFromObject } from '@/lib/generate-options'
import ValidatorPicker from '@/shared/assertion-binding-editor'
import { Button } from '@/shared/button'
import { Checkbox, MultiCheckbox } from '@/shared/checkbox'
import Collapse from '@/shared/collapse'
import DatePicker from '@/shared/date-picker/date-picker'
import Dimension from '@/shared/dimension'
import { Dropdown, DropdownMultipleSelect } from '@/shared/dropdown'
import EditableText from '@/shared/editable-text'
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
import CRUDTable from '@/shared/table/ui/crud-table'
import TextField from '@/shared/textfield'

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

  [BasicComponentsNames.TextField]: {
    type: 'input',
    component: TextField,
    iconName: 'TextField',
  },

  EditableText: {
    type: 'input',
    component: EditableText,
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

  Dimension: {
    type: 'input',
    component: Dimension,
    iconName: 'TouchPointer',
  },

  EventBindingEditor: {
    type: 'input',
    component: EventBindingEditor,
    iconName: 'TouchPointer',
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

  Fetcher: {
    type: 'content',
    component: Fetcher,
    iconName: 'OpenFile',
  },

  DimensionNode: {
    type: 'content',
    component: () => 'Must be inside DimensionTree',
    iconName: 'CheckboxComposite',
  },

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

  CRUDTable: {
    type: 'content',
    component: CRUDTable,
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
