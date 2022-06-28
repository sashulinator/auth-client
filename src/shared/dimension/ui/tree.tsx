import { TreeData } from '@atlaskit/tree'

import TreeNode from './tree-node'
import React, { useEffect, useState } from 'react'

import { CompSchema, emptyFunction } from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

interface ModalProps {
  schema: CompSchema
}

export default function Modal(props: ModalProps): JSX.Element | null {
  const [tree, setTree] = useState<TreeData>()

  useEffect(rebuildTree, [props.schema])

  function rebuildTree() {
    const newTree = buildTree(tree, props.schema.data, {
      search: {
        fieldNames: ['id', 'title'],
      },
      isInitialExpanded: false,
      isRoot: true,
    })
    setTree(newTree)
  }

  if (tree === undefined) {
    return null
  }

  return (
    <Tree
      key={props.schema.id}
      tree={tree}
      renderItem={TreeNode}
      onDragEnd={emptyFunction}
      onDragStart={emptyFunction}
      setTree={setTree}
    />
  )
}
