import { TreeData } from '@atlaskit/tree'

import './tree-checkbox.css'

import TreeNode from './tree-node'
import React, { useEffect, useState } from 'react'

import { CompSchema, emptyFunction } from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

interface ModalProps {
  name: string
  value: string[]
  schema: CompSchema
  onChange: (value: string[]) => void
  multiselect?: boolean
}

export default function TreeCheckbox(props: ModalProps): JSX.Element | null {
  const [tree, setTree] = useState<TreeData>()
  const [value, setValue] = useState<string[]>(props.value || [])

  useEffect(rebuildTree, [props.schema, value])

  function onChange(name: string) {
    if (props?.multiselect) {
      const clonedValue = [...value]
      const index = clonedValue.indexOf(name)

      if (index > -1) {
        clonedValue.splice(index, 1)
      } else {
        clonedValue.push(name)
      }

      setValue(clonedValue)
      props.onChange(clonedValue)
    } else {
      if (value.length === 0) {
        setValue([name])
        props.onChange([name])
      }
      if (value.length !== 0 && value.includes(name)) {
        setValue([])
        props.onChange([])
      }
    }
  }

  function rebuildTree() {
    const newTree = buildTree(tree, props.schema.data, {
      search: { fieldNames: ['id', 'title'] },
      isInitialExpanded: false,
      isRoot: true,
      name: props.name,
      onChange,
      value,
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
