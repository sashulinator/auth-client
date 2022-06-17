import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { Icon, IconButton, Stack } from '@fluentui/react'

import './tree-leaf.css'

import { labelColors } from '../constants/label-colors'
import { typeIcons } from '../constants/type-icons'
import { AdditionalData } from '../lib/build-tree'
import clsx from 'clsx'
import React from 'react'

import { generateOptionsFromStringArray } from '@/lib/generate-options'
import { isEnter } from '@/lib/key-events'
import { Dropdown } from '@/shared/dropdown'
import {
  EventAssertionBindingMetaName,
  EventBinding,
  EventType,
  actionNameOptions,
  eventNameOptions,
} from '@/shared/schema-drawer'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: AdditionalData & {
      binding: EventBinding
    }
  }
}

export default function TreeLeaf(props: TreeLeafProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const { binding } = props.item.data

  const isError = props.item.data.errorId === props.item.id
  const isSelected = props.item.data.selectedItemId === props.item.data.binding.id

  const isOperator = binding.type === EventType.OPERATOR
  const isAction = binding.type === EventType.ACTION
  const isEvent = binding.type === EventType.EVENT
  const options = isOperator
    ? generateOptionsFromStringArray(['or', 'and'])
    : isAction
    ? actionNameOptions
    : isEvent
    ? eventNameOptions
    : EventAssertionBindingMetaName

  return (
    <div
      ref={props.provided.innerRef}
      role="button"
      tabIndex={0}
      className={clsx('BindingTreeLeaf NewTreeLeaf', isSelected && 'isSelected', isError && 'isError')}
      onClick={() => props.item.data?.selectItemId(props.item.id.toString())}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onKeyDown={(e) => {
        props.provided.dragHandleProps.onKeyDown(e)
        props.item.data?.selectItemId(props.item.id.toString())
      }}
    >
      <Stack
        onFocus={() => props.item.data?.selectItemId(props.item.id.toString())}
        className="treeLeafContent"
        horizontal
        verticalAlign="center"
      >
        <div className="treeLeafBorder" />
        <Icon
          tabIndex={0}
          onKeyDown={(e) => {
            if (isEnter(e)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const el: any = document.querySelector('.BindingSetter input')
              setTimeout(() => el?.focus())
            }
          }}
          className={clsx('label', labelColors[binding.type])}
          iconName={typeIcons[binding.type]}
        />
        <Dropdown
          value={binding.name}
          options={options}
          onChange={(name) => props.item.data?.changeBinding?.(props.item.id, name)}
          styles={{ title: { border: '0px', background: 'transparent' }, root: { width: '100%' } }}
        />
        <IconButton
          className="button"
          styles={{
            rootHovered: {
              backgroundColor: 'var(--themePrimary01)',
            },
          }}
          iconProps={{ iconName: 'Cancel' }}
          onClick={() => props.item.data?.remove(props.item.id)}
        />
      </Stack>
    </div>
  )
}
