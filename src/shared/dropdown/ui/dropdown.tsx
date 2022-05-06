import { Dropdown as DropdownUI, IDropdownProps } from '@fluentui/react'

import React, { FC } from 'react'
import { useForm } from 'react-final-form'

/**
 * Дропдаун от FluentUI не совместим с final-form из-за аргументов в onChange
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Dropdown: FC<IDropdownProps & { onChange: (value?: any) => void; value: any; name: string }> = (
  props
): JSX.Element => {
  const form = useForm()

  return (
    <DropdownUI
      {...props}
      selectedKey={props.value}
      onChange={(event, action) => {
        if (action?.key) {
          form.change(props.name, action.key)
        } else {
          form.change(props.name, undefined)
        }
      }}
    />
  )
}

export default Dropdown
