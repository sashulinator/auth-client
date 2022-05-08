import { Dropdown as DropdownUI, IDropdownProps } from '@fluentui/react'

import React, { FC } from 'react'

/**
 * Дропдаун от FluentUI не совместим с final-form из-за аргументов в onChange
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Dropdown: FC<IDropdownProps & { onChange: (value?: any) => void; value: any; name: string }> = (
  props
): JSX.Element => {
  return (
    <DropdownUI
      {...props}
      selectedKey={props.value}
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
