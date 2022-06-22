import { TreeData } from '@atlaskit/tree'

import { DimensionNode } from '..'
import { buildTree } from './build-tree'
import React, { useEffect, useState } from 'react'

import { CompSchema } from '@/shared/schema-drawer'
import Tree from '@/shared/tree'

interface DimensionTreeProps {
  schema?: CompSchema
  // schemas: Catalog<CompSchema>
}

export default function DimensionTree(props: DimensionTreeProps): JSX.Element {
  const [tree, setTree] = useState<TreeData | undefined>()

  useEffect(() => setTree(rebuildTree), [props.schema])

  function rebuildTree(): TreeData | undefined {
    return buildTree(props.schema?.catalog)
  }

  return (
    <div className="DimensionTree">
      {tree && (
        <Tree
          renderItem={DimensionNode}
          tree={tree}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDragStart={() => {}}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDragEnd={() => {}}
          setTree={setTree}
        />
      )}
    </div>
  )
}
