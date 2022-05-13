import { Dropdown as DropdownUI, IDropdownProps, IDropdownStyles } from '@fluentui/react'

import normalizeOptions from '../lib/normalize-options'
import React, { FC } from 'react'

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 'initial' },
  dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
  dropdownItem: { height: 'auto' },
}

/**
 * Дропдаун от FluentUI не совместим с final-form из-за аргументов в onChange
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Dropdown: FC<IDropdownProps & { onChange: (value?: any) => void; value: any; name: string }> = (
  props
): JSX.Element | null => {
  const options = normalizeOptions(props.options)
  return (
    <DropdownUI
      {...props}
      options={options}
      selectedKey={props.value}
      styles={dropdownStyles}
      onChange={(event, action) => {
        if (action?.key) {
          props.onChange(action.key)
        } else {
          props.onChange(undefined)
        }
      }}
    />
  )
}

export default Dropdown
