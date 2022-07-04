import { TreeData } from '@atlaskit/tree'

import TreeNode from './tree-node'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'

import Autosave from '@/shared/autosave'
import { CompSchema, DimensionComp, emptyFunction } from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

interface ModalProps {
  schema: CompSchema
  comp: DimensionComp
  value: undefined | string[]
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
    <Form
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit={emptyFunction}
      // initialValues={selectedBinding.props}
      render={() => {
        return (
          <>
            <Autosave
              save={(data) => {
                console.log('data', data)
              }}
              debounce={0}
            />
            <Tree
              key={props.schema.id}
              tree={tree}
              renderItem={TreeNode}
              onDragEnd={emptyFunction}
              onDragStart={emptyFunction}
              setTree={setTree}
            />
          </>
        )
      }}
    />
  )
}
