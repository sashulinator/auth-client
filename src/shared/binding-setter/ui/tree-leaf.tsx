import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { Icon, IconButton, Stack } from '@fluentui/react'

import './tree-leaf.css'

import { labelColors } from '../constants/label-colors'
import { typeIcons } from '../constants/type-icons'
import { AdditionalData } from '../lib/build-tree'
import clsx from 'clsx'
import React from 'react'

import { generateOptionsFromStringArray } from '@/lib/generate-options'
import { Dropdown } from '@/shared/dropdown'
import {
  EventUnit,
  EventUnitType,
  actionNameOptions,
  eventAssertionNameOptions,
  eventNameOptions,
} from '@/shared/schema-drawer'

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

  const { binding } = props.item.data

  const isError = props.item.data.errorId === props.item.id
  const isSelected = props.item.data.selectedItemId === props.item.data.binding.id

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
      className={clsx('BindingTreeLeaf NewTreeLeaf', isSelected && 'isSelected', isError && 'isError')}
      onClick={() => props.item.data?.selectItemId(props.item.id.toString())}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onKeyDown={(e) => {
        props.provided.dragHandleProps.onKeyDown(e)
        props.item.data?.selectItemId(props.item.id.toString())
      }}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBorder" />
        <Icon iconName={typeIcons[binding.type]} className={clsx('label', labelColors[binding.type])} />
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
              backgroundColor: 'var(--themePrimaryTransparent01)',
            },
          }}
          iconProps={{ iconName: 'Cancel' }}
          onClick={() => props.item.data?.remove(props.item.id)}
        />
      </Stack>
    </div>
  )
}
