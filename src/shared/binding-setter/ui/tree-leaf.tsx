import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { IconButton, Stack } from '@fluentui/react'

import { AdditionalData } from '../lib/build-tree'
import clsx from 'clsx'
import React from 'react'

import {
  EventUnit,
  EventUnitType,
  actionNameOptions,
  eventAssertionNameOptions,
  eventNameOptions,
} from '@/entities/schema'
import { generateOptionsFromStringArray } from '@/lib/generate-options'
import { Dropdown } from '@/shared/dropdown'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: AdditionalData & {
      binding: EventUnit
    }
  }
}

export default function TreeLeaf(props: TreeLeafProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const { binding: binding } = props.item.data

  const isPicked = props.item.data.selectedItemId === props.item.data.binding.id
  const isOperator = binding.type === EventUnitType.OPERATOR
  const isAction = binding.type === EventUnitType.ACTION
  const isEvent = binding.type === EventUnitType.EVENT
  const options = isOperator
    ? generateOptionsFromStringArray(['or', 'and'])
    : isAction
    ? actionNameOptions
    : isEvent
    ? eventNameOptions
    : eventAssertionNameOptions

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
