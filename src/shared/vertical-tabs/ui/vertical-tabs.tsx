import './vertical-tabs.css'

import Item, { TabItem } from './item'
import Selection from './selection'
import clsx from 'clsx'
import React from 'react'

export interface VerticalTabsProps {
  items: TabItem[]
  selectedKey: string | undefined
  animationMs?: number
  onChange: (item: TabItem) => void
}

export default function VerticalTabs(props: VerticalTabsProps): JSX.Element {
  const selectedItemIndex = props.items.findIndex((item) => item.key === props.selectedKey)
  return (
    <div className="VerticalTabs">
      <Selection selectedItemIndex={selectedItemIndex} animationMs={props.animationMs || 100} />
      {props.items.map((item, i) => {
        const selected = selectedItemIndex === i

        return <Item className={clsx(selected && 'selected')} key={item.key} item={item} onChange={props.onChange} />
      })}
    </div>
  )
}
