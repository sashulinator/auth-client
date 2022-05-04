import AtlasianTree, { TreeData, mutateTree } from '@atlaskit/tree'
import { Props } from '@atlaskit/tree/dist/types/components/Tree/Tree-types'

import './index.css'

import TreeLeaf from './tree-leaf'
import React from 'react'

const PADDING_PER_LEVEL = 18

interface TreeProps extends Pick<Props, 'tree' | 'onDragEnd' | 'onDragStart'> {
  setTree: React.Dispatch<React.SetStateAction<TreeData | undefined>>
}

function Tree(props: TreeProps): JSX.Element {
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

  return (
    <AtlasianTree
      tree={props.tree}
      renderItem={TreeLeaf}
      onExpand={onExpand}
      onCollapse={onCollapse}
      onDragEnd={props.onDragEnd}
      onDragStart={props.onDragStart}
      offsetPerLevel={PADDING_PER_LEVEL}
      isDragEnabled
      isNestingEnabled
    />
  )
}

export default Tree
