import { IButtonStyles, Icon, IconButton, Stack, Text } from '@fluentui/react'

import getIconName from '../lib/get-icon-name'
import { TreeLeafProps } from '../types'
import clsx from 'clsx'
import React from 'react'

const buttonStyles: IButtonStyles = {
  rootHovered: {
    backgroundColor: 'transparent',
  },
  rootPressed: {
    backgroundColor: 'transparent',
  },
}

export default function TreeLeaf(props: TreeLeafProps): JSX.Element {
  const isPicked = props.item.data?.pickedIds.includes(props.item.data?.comp.id)
  const isExpandButton = props.item.hasChildren

  const isOneOfMultipleDragging =
    props.snapshot.isDragging && isPicked && props.item.data && props.item.data.pickedIds.length > 1

  return (
    <div
      role="button"
      tabIndex={0}
      data-comp-id={props.item.id}
      onMouseOver={() => props.item.data?.onMouseOver?.(props.item.id)}
      onMouseLeave={() => props.item.data?.onMouseLeave?.(props.item.id)}
      className={clsx('NewTreeLeaf', isPicked && 'isSelected', isExpandButton && 'isExpandButton')}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      onFocus={(e) => {
        props.provided.dragHandleProps.onFocus(e)
        props.item.data?.onFocus?.(props.item.id)
      }}
      onBlur={(e) => {
        props.provided.dragHandleProps.onBlur(e)
        props.item.data?.onBlur?.(props.item.id)
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
            props.item.data?.onItemClick(e, props.item.data.comp.id)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(document as any)?.activeElement?.blur()
          }}
          className={clsx('treeLeafText')}
        >
          <Icon
            iconName={getIconName(props.item.data?.schemas, props.item.data?.comp)}
            style={{ marginRight: '8px' }}
          />
          {isOneOfMultipleDragging
            ? `multiple ${props.item.data?.pickedIds.length || ''}`
            : props.item.data?.comp.title || ''}
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
