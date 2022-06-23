import { RenderItemParams, TreeItem } from '@atlaskit/tree'
import { Icon, IconButton, Stack } from '@fluentui/react'

import './tree-node.css'

import { labelColors } from '../constants/label-colors'
import { AdditionalData } from '../model/types'
import clsx from 'clsx'
import React from 'react'

import { generateOptionsFromStringArray } from '@/lib/generate-options'
import { isEnter } from '@/lib/key-events'
import { ClassNames, createPressEnterOnLabelHandler, typeIcons } from '@/shared/binding-editor'
import { Dropdown } from '@/shared/dropdown'
import {
  EventAssertionBindingMetaName,
  EventBinding,
  EventBindingType,
  actionNameOptions,
  assertionNameOptions,
  eventNameOptions,
} from '@/shared/schema-drawer'

export interface TreeNodeProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: AdditionalData & {
      entity: EventBinding
    }
  }
}

const iconButtonStyles = { rootHovered: { backgroundColor: 'var(--themePrimary01)' } }

const dropdownStyles = { title: { border: '0px', background: 'transparent' }, root: { width: '100%' } }

export default function TreeNode(props: TreeNodeProps): JSX.Element | null {
  if (props.item.data === undefined) {
    return null
  }

  const data = props.item.data

  const isError = data.errorId === props.item.id
  const isSelected = props.item.data.selectedItemId === props.item.data.entity.id

  const isOperator = data.entity.type === EventBindingType.OPERATOR
  const isAction = data.entity.type === EventBindingType.ACTION
  const isEvent = data.entity.type === EventBindingType.EVENT
  const isEventAssertion = data.entity.type === EventBindingType.EVENT_ASSERTION
  const options = isOperator
    ? generateOptionsFromStringArray(['or', 'and'])
    : isAction
    ? actionNameOptions
    : isEvent
    ? eventNameOptions
    : isEventAssertion
    ? EventAssertionBindingMetaName
    : assertionNameOptions

  const currentBindingSelector = `.${ClassNames.BindingEditorRoot}.${data.bindingEditorId}`
  const currentBindingFormSelector = `.${currentBindingSelector}.${ClassNames.bindingForm}`

  const handlePressEnterOnLabel = createPressEnterOnLabelHandler(
    data.entity.id,
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
      className={clsx('BindingTreeLeaf TreeNodeContent', isSelected && 'isSelected', isError && 'isError')}
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
          className={clsx('label', 'deleteBindingButton', labelColors[data.entity.type])}
          iconName={typeIcons[data.entity.type]}
        />
        <Dropdown
          value={data.entity.name}
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
