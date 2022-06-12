import { Dropdown as DropdownUI, IDropdownProps, IDropdownStyles } from '@fluentui/react'

import React from 'react'

import { generateOptionsFromUnknown } from '@/lib/generate-options'

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 'initial' },
  dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
  dropdownItem: { height: 'auto' },
}

interface DropdownProps extends IDropdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value?: any) => void // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name?: string // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
}
/**
 * Дропдаун от FluentUI не совместим с final-form из-за аргументов в onChange
 */

export default function Dropdown(props: DropdownProps): JSX.Element | null {
  const options = generateOptionsFromUnknown(props.options)

  return (
    <DropdownUI
      {...props}
      options={options}
      selectedKey={props.value}
      styles={{ ...dropdownStyles, ...props.styles }}
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
