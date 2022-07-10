import clsx from 'clsx'
import React from 'react'

import { isEnter } from '@/lib/key-events'
import { AnyRecord } from '@/types/common'

export interface TabItem {
  key: string
  label: string
  payload?: AnyRecord
}

interface ItemProps {
  item: TabItem
  onChange: (item: TabItem) => void
  className: string
}

export default function Item(props: ItemProps): JSX.Element {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => isEnter(e) && props.onChange(props.item)}
      onClick={() => props.onChange(props.item)}
      className={clsx('item', props.className)}
      area-label={props.item.label}
    >
      {props.item.label}
    </div>
  )
}
