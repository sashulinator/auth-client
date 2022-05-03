import { IconButton, Stack, Text } from '@fluentui/react'

import { TreeLeafProps } from '../../../pages/form-constructor/tree-panel/types'
import clsx from 'clsx'
import React from 'react'

export default function TreeLeaf(props: TreeLeafProps): JSX.Element {
  const isPicked = props.item.data?.pickedFCompId === props.item.data?.comp.id
  const isExpandButton = props.item.hasChildren

  return (
    <div
      onMouseOver={() => props.item.data?.onMouseOver?.(props.item.id)}
      onMouseLeave={() => props.item.data?.onMouseLeave?.(props.item.id)}
      onFocus={() => props.item.data?.onFocus?.(props.item.id)}
      onBlur={() => props.item.data?.onBlur?.(props.item.id)}
      className={clsx('TreeLeaf', isPicked && 'picked', isExpandButton && 'isExpandButton')}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBackgroundColor" />
        {isExpandButton && <ExpandButton {...props} />}
        <Text
          as="div"
          onClick={() => props.item.data?.setPickedFCompId(props.item.data.comp.id)}
          className="treeLeafText"
        >
          {props.item.data?.comp.name || ''}
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
      className={clsx('ExpandButton', p.item.isExpanded && 'turnChildRight90', 'transitionChild01')}
      iconProps={{ iconName: 'ChevronRight' }}
      onClick={toggle}
    />
  )
}
