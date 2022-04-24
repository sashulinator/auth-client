import { Dropdown, IDropdownProps } from '@fluentui/react'

import React, { FC } from 'react'

const DropdownApp: FC<IDropdownProps & { onChange: (value?: string | number) => void }> = (props): JSX.Element => {
  return <Dropdown {...props} onChange={(event, selected) => props.onChange(selected?.key)} />
}

export default DropdownApp
