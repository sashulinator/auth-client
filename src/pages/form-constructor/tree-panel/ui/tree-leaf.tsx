import { ActionButton, IconButton, Stack } from '@fluentui/react'

import { TreeLeafProps } from '../types'
import React from 'react'

const buttonStyles = {
  root: { color: 'var(--themeDark)' },
  rootDisabled: { color: 'var(--themeTertiary)' },
}

function TreeLeaf(p: TreeLeafProps): JSX.Element {
  const isPicked = p.item.data?.pickedFCompId === p.item.data?.comp.id

  return (
    <div {...p.provided.draggableProps} {...p.provided.dragHandleProps} ref={p.provided.innerRef}>
      <Stack horizontal>
        <Stack className="leafIcons">
          <ExpandIcon {...p} />
        </Stack>
        <ActionButton
          onClick={() => p.item.data?.setPickedFCompId(p.item.data.comp.id)}
          styles={isPicked ? buttonStyles : undefined}
        >
          {p.item.data?.comp.name || ''}
        </ActionButton>
      </Stack>
    </div>
  )
}

export default TreeLeaf

function ExpandIcon(p: TreeLeafProps) {
  if (!p.item.hasChildren) {
    return null
  }

  return p.item.isExpanded ? (
    <IconButton iconProps={{ iconName: 'ChevronDown' }} onClick={() => p.onCollapse(p.item.id)} />
  ) : (
    <IconButton iconProps={{ iconName: 'ChevronRight' }} onClick={() => p.onExpand(p.item.id)} />
  )
}
