import { IButtonStyles, Icon, IconButton, Stack, Text } from '@fluentui/react'

import { TreeLeafProps } from '../types'
import clsx from 'clsx'
import React from 'react'

import componentList from '@/constants/component-list'
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

export default function TreeLeaf(props: TreeLeafProps): JSX.Element {
  const comp = props.item.data?.comp as Comp

  const isPicked = props.item.data?.pickedIds.includes(props.item.data?.comp.id)
  const isExpandButton = props.item.hasChildren
  const searchQuery = props.item.data?.searchQuery || ''
  const isEdited = props.item.data?.editId === props.item.data?.comp.id

  const isOneOfMultipleDragging =
    props.snapshot.isDragging && isPicked && props.item.data && props.item.data.pickedIds.length > 1

  const schema = props.item.data?.schemas?.[props.item.data?.comp.compSchemaId]
  const iconName = componentList[schema?.componentName || '']?.iconName || 'Unknown'

  const title = (props.item.data?.comp.title || '').replace(searchQuery, `<span class="query">${searchQuery}</span>`)

  return (
    <div
      role="button"
      tabIndex={0}
      data-comp-id={props.item.id}
      onMouseOver={() => props.item.data?.onMouseOver?.(props.item.id)}
      // onMouseLeave={() => props.item.data?.onMouseLeave?.(props.item.id)}
      className={clsx('NewTreeLeaf', isPicked && 'isSelected', isExpandButton && 'isExpandButton')}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onFocus={(e) => {
        props.provided.dragHandleProps.onFocus(e)
        // props.item.data?.onFocus?.(props.item.id)
      }}
      onBlur={(e) => {
        props.provided.dragHandleProps.onBlur(e)
        // props.item.data?.onBlur?.(props.item.id)
      }}
      onKeyDown={(e) => {
        props.provided.dragHandleProps.onKeyDown(e)
        props.item.data?.onKeyDown?.(e, props.item.id)
      }}
      ref={props.provided.innerRef}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBorder" />
        {isExpandButton ? <ExpandButton {...props} /> : <div style={{ width: '44px', height: '32px' }} />}

        <Text
          as="div"
          onClick={(e) => {
            if (isEdited) {
              return
            }
            props.item.data?.onItemClick(e, props.item.data.comp.id)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(document as any)?.activeElement?.blur()
          }}
          onDoubleClick={() => props.item.data?.onDoubleClick(comp.id)}
          className={clsx('treeLeafText')}
        >
          <Icon iconName={iconName} style={{ marginRight: '8px' }} />
          {isEdited ? (
            <EditableText
              isInitialEditing={isEdited}
              onEditingChange={(isEdited) => props.item.data?.onDoubleClick(isEdited ? comp.id : undefined)}
              defaultValue={props.item.data?.comp.title}
              onKeyDown={(e) => {
                // TODO написать функцию создать файл event-action
                // TODO добавить в него функцию getValue
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const value = (e.target as any).value
                if (isEnter(e) && value) {
                  props.item.data?.updateComp({ ...comp, title: value })
                  props.item.data?.onDoubleClick(undefined)
                }
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: isOneOfMultipleDragging ? `multiple ${props.item.data?.pickedIds.length || ''}` : title,
              }}
            ></div>
          )}
        </Text>
      </Stack>
    </div>
  )
}

function ExpandButton(p: TreeLeafProps) {
  function toggle() {
    p.item.isExpanded ? p.onCollapse(p.item.id) : p.onExpand(p.item.id)
  }

  return (
    <IconButton
      styles={buttonStyles}
      className={clsx('button', p.item.isExpanded && 'turnChildRight90', 'transitionChild01')}
      iconProps={{ iconName: 'ChevronRight' }}
      onClick={toggle}
    />
  )
}
