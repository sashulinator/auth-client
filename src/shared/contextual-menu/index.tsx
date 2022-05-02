import { ContextualMenu as FluenContextualMenu, IContextualMenuItem } from '@fluentui/react'

import './index.css'

import React, { useRef } from 'react'

import useBoolean from '@/utils/use-boolean'

interface ContextualMenuProps {
  items: IContextualMenuItem[]
  children: React.ReactChild
}

export default function ContextualMenu(props: ContextualMenuProps): JSX.Element | null {
  const [isVisible, , hide, toggle] = useBoolean(false)
  const buttonRef = useRef(null)

  return (
    <div className="CompContextualMenu">
      <div className="compContextualMenubackground" />
      <a ref={buttonRef} href="#" onClick={toggle}>
        {props.children}
      </a>
      <FluenContextualMenu
        items={props.items}
        hidden={!isVisible}
        target={buttonRef}
        onItemClick={hide}
        onDismiss={hide}
      />
    </div>
  )
}
