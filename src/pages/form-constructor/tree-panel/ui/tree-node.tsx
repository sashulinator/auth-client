import { IButtonStyles, Icon, IconButton, Stack } from '@fluentui/react'

import { TreeLeafProps } from '../types'
import clsx from 'clsx'
import React, { memo, useState } from 'react'
import { useRecoilState } from 'recoil'

import componentList from '@/constants/component-list'
import { schemasState, selectedCompIdsState } from '@/entities/schema'
import { getValue, removeFocus } from '@/lib/dom-utils'
import { isEnter } from '@/lib/key-events'
import EditableText from '@/shared/editable-text'
import { Comp } from '@/shared/schema-drawer'

const buttonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'transparent',
  },
  rootPressed: {
    backgroundColor: 'transparent',
  },
}

interface TreeNodeContentProps extends Pick<TreeLeafProps, 'onCollapse' | 'onExpand'> {
  isSelected: boolean
  isExpandButton: boolean
  iconName: string
  title: string
  isExpanded: boolean
  id: string
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, itemId: string) => void
  setTitle: (title: string) => void
  setIsEditing: (isEditing: boolean) => void
  isEditing: boolean
}

const TreeNodeContent = memo(function TreeNodeContent(props: TreeNodeContentProps) {
  function onRootClick(e: React.MouseEvent<HTMLElement>) {
    if (props.isEditing) {
      return
    }

    props.onItemClick?.(e, props.id)
    removeFocus()
  }

  function saveTitle(e: React.KeyboardEvent) {
    if (isEnter(e)) {
      props.setIsEditing(false)
      props.setTitle(getValue(e))
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      className={clsx('TreeNodeContent', props.isSelected && 'isSelected', props.isExpandButton && 'isExpandButton')}
      onClick={onRootClick}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBorder" />
        {props.isExpandButton ? (
          <ExpandButton
            id={props.id}
            isExpanded={props.isExpanded}
            onExpand={props.onExpand}
            onCollapse={props.onCollapse}
          />
        ) : (
          <div style={{ width: '44px', height: '32px' }} />
        )}
        <Icon iconName={props.iconName} style={{ marginRight: '8px' }} />
        <EditableText
          defaultValue={props.title}
          isEditing={props.isEditing}
          setIsEditing={props.setIsEditing}
          onKeyDown={saveTitle}
        />
      </Stack>
    </div>
  )
})

function OptimizationLayer(props: TreeLeafProps) {
  const [selectedCompIds] = useRecoilState(selectedCompIdsState)
  const [schemas] = useRecoilState(schemasState)
  const schema = schemas?.[props.item.data?.entity?.compSchemaId || '']
  const isSelected = selectedCompIds.includes(props.item.data?.entity.id || '')
  const isExpandButton = !!props.item.hasChildren
  const [isEditing, setIsEditing] = useState(false)

  const iconName = componentList[schema?.componentName || '']?.iconName || 'Unknown'
  const comp = props.item.data?.entity as Comp

  function onItemClick(e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) {
    props.item.data?.onItemClick(e, id, selectedCompIds)
  }

  return (
    <TreeNodeContent
      key={comp.id}
      id={comp.id}
      iconName={iconName}
      isSelected={isSelected}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      isExpandButton={isExpandButton}
      title={getTitle(props, isSelected, selectedCompIds)}
      onCollapse={props.onCollapse}
      onExpand={props.onExpand}
      onItemClick={onItemClick}
      setTitle={(title) => props.item.data?.updateComp({ ...comp, title })}
      isExpanded={!!props.item.isExpanded}
    />
  )
}

export default function TreeNode(props: TreeLeafProps): JSX.Element {
  return (
    <div
      role="button"
      tabIndex={0}
      data-comp-id={props.item.id}
      onMouseOver={() => props.item.data?.onMouseOver?.(props.item.id)}
      // onMouseLeave={() => props.item.data?.onMouseLeave?.(props.item.id)}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onFocus={(e) => {
        props.provided.dragHandleProps.onFocus(e)
        // props.item.data?.onFocus?.(props.item.id)
      }}
      onKeyDown={(e) => {
        props.provided.dragHandleProps.onKeyDown(e)
        props.item.data?.onKeyDown?.(e, props.item.id)
      }}
      ref={props.provided.innerRef}
    >
      <OptimizationLayer {...props} />
    </div>
  )
}

type ExpandButtonProps = Pick<TreeLeafProps, 'onCollapse' | 'onExpand'> & { id: string; isExpanded: boolean }

function ExpandButton(props: ExpandButtonProps) {
  function toggle() {
    props.isExpanded ? props.onCollapse(props.id) : props.onExpand(props.id)
  }

  return (
    <IconButton
      styles={buttonStyles}
      className={clsx('button', props.isExpanded && 'turnChildRight90', 'transitionChild01')}
      iconProps={{ iconName: 'ChevronRight' }}
      onClick={toggle}
    />
  )
}

// Private

function getTitle(props: TreeLeafProps, isSelected: boolean, selectedCompIds: string[]): string {
  const searchQuery = props.item.data?.search?.query || ''
  let title = props.item.data?.entity.title || ''

  title = title.replaceAll(new RegExp(searchQuery, 'ig'), (match) => `<span class="query">${match}</span>`)

  const isOneOfMultipleDragging =
    props.snapshot.isDragging && isSelected && props.item.data && selectedCompIds.length > 1

  return isOneOfMultipleDragging ? `multiple ${selectedCompIds.length || ''}` : title
}
