import { Dropdown as DropdownUI, IDropdownProps } from '@fluentui/react'

import normalizeOptions from '../lib/normalize-options'
import React, { FC } from 'react'

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
