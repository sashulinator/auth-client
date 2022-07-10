import './nav.css'

import React from 'react'

import VerticalTabs, { TabItem, VerticalTabsProps } from '@/shared/vertical-tabs'

export type NavItem = TabItem

type NavProps = VerticalTabsProps

export default function Nav(props: NavProps): JSX.Element {
  return (
    <div className="Nav">
      <VerticalTabs
        items={props.items}
        selectedKey={props.selectedKey}
        animationMs={props.animationMs}
        onChange={props.onChange}
      />
    </div>
  )
}
