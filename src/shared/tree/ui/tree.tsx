import AtlasianTree, { TreeData, TreeDestinationPosition, TreeSourcePosition, mutateTree } from '@atlaskit/tree'
import { Props } from '@atlaskit/tree/dist/types/components/Tree/Tree-types'
import { assertNotNull } from '@savchenko91/schema-validator'

import './tree.css'

import React, { useRef, useState } from 'react'

const PADDING_PER_LEVEL = 18

interface TreeProps extends Pick<Props, 'tree' | 'onDragEnd' | 'onDragStart' | 'renderItem'> {
  setTree: React.Dispatch<React.SetStateAction<TreeData | undefined>>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

function Tree(props: TreeProps): JSX.Element {
  const [height, setHeight] = useState<number | 'auto'>('auto')
  const ref = useRef<HTMLDivElement | null>(null)

  function handleSetHeight() {
    assertNotNull(ref.current)
    const { height } = getComputedStyle(ref.current)
    setHeight(parseInt(height, 10) + 1)
  }

  function onExpand(itemId: string | number) {
    if (props.tree !== undefined) {
      props.setTree(mutateTree(props.tree, itemId, { isExpanded: true }))
    }
  }

  function onCollapse(itemId: string | number) {
    if (props.tree !== undefined) {
      props.setTree(mutateTree(props.tree, itemId, { isExpanded: false }))
    }
  }

  function onDragStart(itemId: string | number) {
    props.onDragStart(itemId)
    handleSetHeight()
  }

  function onDragEnd(sourcePosition: TreeSourcePosition, destinationPosition?: TreeDestinationPosition) {
    props.onDragEnd(sourcePosition, destinationPosition)
    setTimeout(() => setHeight('auto'), 200)
  }

  return (
    <div style={{ height }} ref={ref} onMouseLeave={props.onMouseLeave}>
      <AtlasianTree
        tree={props.tree}
        renderItem={props.renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        offsetPerLevel={PADDING_PER_LEVEL}
        isDragEnabled
        isNestingEnabled
      />
    </div>
  )
}

export default Tree
