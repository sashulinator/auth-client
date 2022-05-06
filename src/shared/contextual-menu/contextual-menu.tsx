import { ContextualMenu as FluenContextualMenu, IContextualMenuItem } from '@fluentui/react'

import './contextual-menu.css'

import React, { useRef } from 'react'

import useBoolean from '@/lib/use-boolean'

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
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <a ref={buttonRef} onClick={toggle}>
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
