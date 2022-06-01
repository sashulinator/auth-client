import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { IconButton, Stack } from '@fluentui/react'

import { AdditionalData } from '../lib/build-tree'
import clsx from 'clsx'
import React from 'react'

import { BindingItem, BindingItemType } from '@/entities/schema'
import optionsFromStringArray from '@/lib/options-from-string-array'
import { Dropdown } from '@/shared/dropdown'
import { actionNameOptions } from '@/shared/schema-drawer/lib/action-list'
import { assertionNameOptions } from '@/shared/schema-drawer/lib/assertion-list'
import { eventNameOptions } from '@/shared/schema-drawer/lib/event-list'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: AdditionalData & {
      binding: BindingItem
    }
  }
}

export default function TreeLeaf(props: TreeLeafProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const { binding: binding } = props.item.data

  const isPicked = props.item.data.selectedItemId === props.item.data.binding.id
  const isOperator = binding.type === BindingItemType.OPERATOR
  const isAction = binding.type === BindingItemType.ACTION
  const isEvent = binding.type === BindingItemType.EVENT
  const options = isOperator
    ? optionsFromStringArray(['or', 'and'])
    : isAction
    ? actionNameOptions
    : isEvent
    ? eventNameOptions
    : assertionNameOptions

  return (
    <div
      ref={props.provided.innerRef}
      role="button"
      tabIndex={0}
      className={clsx('TreeLeaf', isPicked && 'picked')}
      onClick={() => props.item.data?.selectItemId(props.item.id.toString())}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onKeyDown={(e) => {
        props.provided.dragHandleProps.onKeyDown(e)
        props.item.data?.selectItemId(props.item.id.toString())
      }}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBackgroundColor" />
        <div className="treeLeafBorderColor" />
        <IconButton
          className="button"
          iconProps={{ iconName: 'Cancel' }}
          onClick={() => props.item.data?.remove(props.item.id)}
        />
        <div className="type">{isOperator ? 'O' : 'A'}</div>
        <Stack className="treeLeafText" horizontal>
          <Dropdown
            value={binding.name}
            options={options}
            onChange={(name) => props.item.data?.changeBinding?.(props.item.id, name)}
            styles={{ title: { border: '0px', background: 'transparent' }, root: { width: '100%' } }}
          />
        </Stack>
      </Stack>
    </div>
  )
}
