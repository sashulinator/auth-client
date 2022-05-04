import { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton, isMac } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './index.css'

import { buildTree } from '../lib/build-tree'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState } from 'recoil'

import { moveComp } from '@/helpers/form-schema-state'
import { paletteModalState } from '@/pages/form-constructor/palette-modal'
import {
  FSchemaState,
  highlightComponent,
  pickedFCompIdsState,
  removeHighlight,
} from '@/pages/form-constructor/preview'
import Tree from '@/shared/tree'

function TreePanel(): JSX.Element {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompIds, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(rebuildTree)

  useEffect(() => setTree(rebuildTree), [FSchema, pickedFCompIds])

  console.log('pickedFCompIdspickedFCompIds', pickedFCompIds)

  function rebuildTree() {
    return buildTree(FSchema?.comps, {
      pickedIds: pickedFCompIds,
      onItemClick: setPickedFCompIds,
      onMouseOver: highlightComponent,
      onFocus: highlightComponent,
      onBlur: removeHighlight,
      onMouseLeave: removeHighlight,
      onKeyDown,
    })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>, itemId: string | number) {
    assertString(itemId)

    const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

    if (e.key === 'Enter' && e[controlKeyName]) {
      if (pickedFCompIds.includes(itemId)) {
        setPickedFCompIds(pickedFCompIds.filter((id) => id !== itemId))
        return
      }
      setPickedFCompIds([...new Set([...pickedFCompIds, itemId])])
      return
    }

    if (e.key === 'Enter') {
      setPickedFCompIds([itemId])
    }
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
