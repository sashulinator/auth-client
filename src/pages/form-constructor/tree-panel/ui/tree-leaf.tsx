import { IconButton, Stack, Text } from '@fluentui/react'

import { TreeLeafProps } from '../types'
import clsx from 'clsx'
import React from 'react'

function TreeLeaf(p: TreeLeafProps): JSX.Element {
  const isPicked = p.item.data?.pickedFCompId === p.item.data?.comp.id
  const isExpandButton = p.item.hasChildren

  return (
    <div
      className={clsx('TreeLeaf', isPicked && 'picked', isExpandButton && 'isExpandButton')}
      {...p.provided.draggableProps}
      {...p.provided.dragHandleProps}
      ref={p.provided.innerRef}
    >
      <Stack className="treeLeafContent" horizontal verticalAlign="center">
        <div className="treeLeafBackgroundColor" />
        {isExpandButton && <ExpandButton {...p} />}
        <Text as="div" onClick={() => p.item.data?.setPickedFCompId(p.item.data.comp.id)} className="treeLeafText">
          {p.item.data?.comp.name || ''}
        </Text>
      </Stack>
    </div>
  )
}

export default TreeLeaf

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
