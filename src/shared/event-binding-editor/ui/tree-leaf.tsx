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
import { ClassNames, createPressEnterOnLabelHandler } from '@/shared/binding-editor'
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

const iconButtonStyles = { rootHovered: { backgroundColor: 'var(--themePrimary01)' } }

const dropdownStyles = { title: { border: '0px', background: 'transparent' }, root: { width: '100%' } }

export default function TreeLeaf(props: TreeLeafProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const data = props.item.data

  const isError = data.errorId === props.item.id
  const isSelected = props.item.data.selectedItemId === props.item.data.binding.id

  const isOperator = data.binding.type === EventType.OPERATOR
  const isAction = data.binding.type === EventType.ACTION
  const isEvent = data.binding.type === EventType.EVENT
  const options = isOperator
    ? generateOptionsFromStringArray(['or', 'and'])
    : isAction
    ? actionNameOptions
    : isEvent
    ? eventNameOptions
    : EventAssertionBindingMetaName

  const currentBindingSelector = `.${ClassNames.BindingEditorRoot}.${data.bindingEditorId}`
  const currentBindingFormSelector = `.${currentBindingSelector}.${ClassNames.bindingForm}`

  const handlePressEnterOnLabel = createPressEnterOnLabelHandler(
    data.binding.id,
    currentBindingFormSelector,
    data.selectItemId
  )

  function handlePressEnterOnTreeLeaf(e: React.KeyboardEvent) {
    props.provided.dragHandleProps.onKeyDown(e)

    if (isEnter(e)) {
      props.item.data?.selectItemId(props.item.id.toString())
    }
  }

  return (
    <div
      className={clsx('BindingTreeLeaf NewTreeLeaf', isSelected && 'isSelected', isError && 'isError')}
      role="button"
      tabIndex={0}
      onClick={() => props.item.data?.selectItemId(props.item.id.toString())}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onKeyDown={handlePressEnterOnTreeLeaf}
      ref={props.provided.innerRef}
    >
      <Stack className="treeLeafContent" verticalAlign="center" horizontal={true}>
        <div className="treeLeafBorder" />
        <Icon
          tabIndex={0}
          onKeyDown={handlePressEnterOnLabel}
          className={clsx('label', 'deleteBindingButton', labelColors[data.binding.type])}
          iconName={typeIcons[data.binding.type]}
        />
        <Dropdown
          value={data.binding.name}
          options={options}
          onChange={(name) => props.item.data?.changeBinding?.(props.item.id, name)}
          styles={dropdownStyles}
        />
        <IconButton
          className="button"
          styles={iconButtonStyles}
          iconProps={{ iconName: 'Cancel' }}
          onClick={() => props.item.data?.remove(props.item.id)}
        />
      </Stack>
    </div>
  )
}
