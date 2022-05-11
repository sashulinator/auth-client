import { Checkbox, IDropdownOption, PrimaryButton, Stack, Text } from '@fluentui/react'

import { ComponentNames } from '../model/types'

import CustomDatePicker from '@/shared/date-picker'
import Fetcher from '@/shared/fetcher'
import JSONEditor from '@/shared/json-editor'
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

  // Inputs

  [ComponentNames.TextField]: {
    type: 'input',
    component: CustomTextField,
  },

  DatePicker: {
    type: 'input',
    component: CustomDatePicker,
  },

  Fetcher: {
    type: 'input',
    component: Fetcher,
  },

  JSONEditor: {
    type: 'input',
    component: JSONEditor,
  },

  // Contents

  [ComponentNames.Stack]: {
    type: 'content',
    component: Stack,
  },
  PrimaryButton: {
    type: 'content',
    component: PrimaryButton,
  },

  Text: {
    type: 'content',
    component: Text,
  },

  Table: {
    type: 'input',
    component: Table,
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
