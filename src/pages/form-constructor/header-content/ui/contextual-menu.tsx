import { IContextualMenuItem, Icon } from '@fluentui/react'

import React from 'react'

import ContextualMenu from '@/shared/contextual-menu/contextual-menu'

interface ContextualMenuProps {
  deleteSchema: () => void | Promise<void>
  copySchema: () => void | Promise<void>
}

export default function SchemaContextualMenu(props: ContextualMenuProps): JSX.Element {
  const items: IContextualMenuItem[] = [
    {
      key: 'delete',
      text: 'delete',
      onClick: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        props.deleteSchema()
      },
    },
    {
      key: 'copy',
      text: 'copy',
      onClick: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        props.copySchema()
      },
    },
  ]

  return (
    <ContextualMenu items={items}>
      <Icon iconName="More" />
    </ContextualMenu>
  )
}
