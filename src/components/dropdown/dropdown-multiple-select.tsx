import { Dropdown as DropdownUI, IDropdownProps } from '@fluentui/react'

import React, { FC } from 'react'
import { useForm } from 'react-final-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownMultipleSelect: FC<IDropdownProps & { onChange: (value?: any) => void; value: any; name: string }> = (
  props
): JSX.Element => {
  const form = useForm()

  return (
    <DropdownUI
      {...props}
      multiSelect
      onChange={(event, action) => {
        if (action?.selected) {
          form.change(props.name, [...props.value, action.key])
        } else {
          form.change(
            props.name,
            props.value?.filter((str: string) => str !== action?.key)
          )
        }
      }}
    />
  )
}

export default DropdownMultipleSelect
