import { Modal, PrimaryButton } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import './dimension.css'

import { isEmpty } from 'lodash'
import React, { useState } from 'react'

import TreeNode from '@/pages/form-constructor/tree-panel/ui/tree-node'
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
  const value = isString(props.value) ? undefined : props.value
  console.log('value', value)

  console.log('tree', props.schemas)
  return (
    <div className="Dimension">
      {'value?.join()'}
      <PrimaryButton onClick={() => setOpen(true)} />
      <Modal isOpen={isOpen} onDismiss={() => setOpen(false)}>
        {Object.values(props.schemas || {}).map((schema) => {
          if (isEmpty(schema.data)) {
            return
          }

          const tree = buildTree(undefined, schema.data, { isInitialExpanded: false })

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
              setTree={emptyFunction}
            />
          )
        })}
      </Modal>
    </div>
  )
}
