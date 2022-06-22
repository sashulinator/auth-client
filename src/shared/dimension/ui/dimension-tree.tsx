import { ItemId, TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import './dimension-tree.css'

import { DimensionNode } from '..'
import { buildTree } from './build-tree'
import React, { useEffect, useState } from 'react'

import { CompSchema } from '@/shared/schema-drawer'

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
      {tree && tree.items[tree.rootId]?.children.map((childId) => factory(childId, tree.items))}
    </div>
  )
}

function factory(id: string | number | undefined, items: Record<ItemId, TreeItem>) {
  if (id === undefined) {
    return null
  }

  const item = items[id]
  assertNotUndefined(item)

  console.log('item', item)

  return (
    <div className="dimensionFactory">
      <>
        <DimensionNode item={item} />
        {item.children.map((childId) => {
          return factory(childId, items)
        })}
      </>
    </div>
  )
}
