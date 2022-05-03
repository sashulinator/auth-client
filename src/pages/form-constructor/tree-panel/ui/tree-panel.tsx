import { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import './index.css'

import { paletteModalState } from '../../palette-modal/model'
import { buildTree } from '../lib/build-tree'
import { highlightComponent, removeHighlight } from '../lib/highlight'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState } from 'recoil'

import { moveComps as moveComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState } from '@/pages/form-constructor/preview/model/form-schema'
import Tree from '@/shared/tree'

function TreePanel(): JSX.Element {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompId, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(rebuildTree)

  useEffect(() => setTree(rebuildTree), [FSchema, pickedFCompId])

  function rebuildTree() {
    return buildTree(FSchema?.comps, {
      pickedFCompId,
      setPickedFCompId,
      onMouseOver: highlightComponent,
      onFocus: highlightComponent,
      onBlur: removeHighlight,
      onMouseLeave: removeHighlight,
    })
  }

  function onDragEnd(from: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to) {
      return
    }

    assertNotUndefined(tree)

    setTree(moveItemOnTree(tree, from, to))

    const newFormSchema = moveComp(FSchema?.comps, from, to)

    setFSchema({ ...FSchema, comps: newFormSchema })
  }

  return (
    <>
      <PrimaryButton className="addCompButton" onClick={() => setPaletteOpen(true)}>
        <FontIcon aria-label="Add Comp" iconName="Add" />
      </PrimaryButton>
      <PerfectScrollbar className="TreePanel">
        <div className="marginTopAndBottom">{tree && <Tree tree={tree} onDragEnd={onDragEnd} setTree={setTree} />}</div>
      </PerfectScrollbar>
    </>
  )
}

export default TreePanel
