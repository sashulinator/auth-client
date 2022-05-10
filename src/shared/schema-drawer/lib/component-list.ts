import { Checkbox, IDropdownOption, PrimaryButton, Stack, Text } from '@fluentui/react'

import CustomDatePicker from '@/shared/date-picker'
import JSONEditor from '@/shared/json-editor'
import CustomTextField from '@/shared/textfield'
import ValidatorPicker from '@/shared/validator-picker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentList: Record<string, ComponentItem> = {
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

  TextField: {
    type: 'input',
    component: CustomTextField,
  },

  DatePicker: {
    type: 'input',
    component: CustomDatePicker,
  },

  JSONEditor: {
    type: 'input',
    component: JSONEditor,
  },

  // Contents

  Stack: {
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
}

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
