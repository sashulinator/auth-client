import Tree, { TreeDestinationPosition, TreeSourcePosition, mutateTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton } from '@fluentui/react'

import './index.css'

import { paletteModalState } from '../../palette-modal/model'
import { buildTree } from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { moveComps as moveComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/pages/form-constructor/preview/model/form-schema'

const PADDING_PER_LEVEL = 20

function TreePanel(): JSX.Element {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompId, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(() => buildTree(FSchema?.comps, { pickedFCompId, setPickedFCompId }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTree(buildTree(FSchema?.comps, { pickedFCompId, setPickedFCompId })), [FSchema, pickedFCompId])

  function onExpand(itemId: string | number) {
    if (tree !== undefined) {
      setTree(mutateTree(tree, itemId, { isExpanded: true }))
    }
  }

  function onCollapse(itemId: string | number) {
    if (tree !== undefined) {
      setTree(mutateTree(tree, itemId, { isExpanded: false }))
    }
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to) {
      return
    }
    if (!FSchema?.comps && FSchema === null) {
      return
    }

    const newFormSchema = moveComp(FSchema?.comps, from, to)
    setFSchema({ ...FSchema, comps: newFormSchema })
  }

  return (
    <div className="TreePanel">
      <PrimaryButton className="addCompButton" onClick={() => setPaletteOpen(true)}>
        <FontIcon aria-label="Add Comp" iconName="Add" />
      </PrimaryButton>
      {tree && (
        <Tree
          tree={tree}
          renderItem={TreeLeaf}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onDragEnd={onDragEnd}
          offsetPerLevel={PADDING_PER_LEVEL}
          isDragEnabled
          isNestingEnabled
        />
      )}
    </div>
  )
}

export default TreePanel
