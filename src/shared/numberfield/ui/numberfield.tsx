import { ITextFieldProps } from '@fluentui/react'

import React, { useState } from 'react'

import CustomTextField from '@/shared/textfield/ui/textfield'

export default function NumberField(props: ITextFieldProps) {
  const [value, setValue] = useState('')

  function onChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) {
    const parsedValue = parseFloat(value ?? '')
    if (isNaN(parsedValue)) {
      props.onChange?.(event, (parsedValue as unknown) as string)
    }
    if (value?.match(/^-?[0-9]+\,?[0-9]*$/g)) {
      setValue(value)
    }
  }

  return <CustomTextField {...props} value={value?.toString()} onChange={onChange} />
}
