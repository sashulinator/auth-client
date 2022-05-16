import { Dropdown as DropdownUI, IDropdownProps, IDropdownStyles } from '@fluentui/react'

import React, { FC } from 'react'
import { useForm } from 'react-final-form'

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  dropdownOptionText: { overflow: 'hidden', whiteSpace: 'auto' },
  dropdownItem: { height: 'auto' },
  dropdownItemSelected: { height: 'auto' },
}

/**
 * Дропдаун от FluentUI не совместим с final-form из-за аргументов в onChange
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownMultipleSelect: FC<IDropdownProps & { onChange: (value?: any) => void; value: any; name: string }> = (
  props
): JSX.Element => {
  const form = useForm()

  return (
    <DropdownUI
      {...props}
      multiSelect
      styles={dropdownStyles}
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
