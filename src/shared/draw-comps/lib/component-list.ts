import { Checkbox, PrimaryButton, Stack, Text } from '@fluentui/react'

import CustomTextField from '@/components/text-field'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentList: Record<string, any> = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
  Text,
}

export default componentList
