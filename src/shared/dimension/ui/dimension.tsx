import { TreeData } from '@atlaskit/tree'
import { Modal, PrimaryButton } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import './dimension.css'

import TreeNode from './tree-node'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { Catalog, CompSchema, emptyFunction } from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

interface DimensionProps {
  schemas: Catalog<CompSchema>
  value: string[] | string | undefined
}

DimensionComp.defaultValues = {
  schemas: {},
}

export default function DimensionComp(props: DimensionProps): JSX.Element {
  const [isOpen, setOpen] = useState(false)
  const [tree, setTree] = useState<TreeData>()
  const value = isString(props.value) ? undefined : props.value

  console.log('value', value)

  console.log('tree', props.schemas)
  return (
    <div className="Dimension">
      {'value?.join()'}
      <PrimaryButton onClick={() => setOpen(true)} />
      <Modal isOpen={isOpen} onDismiss={() => setOpen(false)}>
        {Object.values(props.schemas || {}).map((schema) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(rebuildTree, [props.schemas])

          function rebuildTree() {
            const newTree = buildTree(tree, schema.data, {
              search: {
                fieldNames: ['id', 'title'],
              },
              isInitialExpanded: false,
              schemas: props.schemas,
              isRoot: true,
            })
            setTree(newTree)
          }

          if (isEmpty(schema.data)) {
            return
          }

          if (tree === undefined) {
            return null
          }

          return (
            <Tree
              key={schema.id}
              tree={tree}
              renderItem={TreeNode}
              onDragEnd={emptyFunction}
              onDragStart={emptyFunction}
              setTree={setTree}
            />
          )
        })}
      </Modal>
    </div>
  )
}
