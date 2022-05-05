import { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton, isMac } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './index.css'

import { buildTree } from '../lib/build-tree'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState } from 'recoil'

import { paletteModalState } from '@/pages/form-constructor/palette-modal'
import {
  FSchemaHistoryState,
  highlightHover,
  pickedFCompIdsState,
  removeAllHoverHighlights,
  setFSchemaComps,
} from '@/pages/form-constructor/preview'
import { findComp, findCompPosition, moveComp } from '@/shared/draw-comps/lib/mutators'
import Tree from '@/shared/tree'

function TreePanel(): JSX.Element {
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const [pickedFCompIds, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(rebuildTree)

  useEffect(() => setTree(rebuildTree), [FSchemaHistory, pickedFCompIds])

  function rebuildTree() {
    return buildTree(FSchemaHistory.data?.comps, {
      pickedIds: pickedFCompIds,
      onItemClick,
      onMouseOver: highlightHover,
      onFocus: highlightHover,
      onBlur: removeAllHoverHighlights,
      onMouseLeave: removeAllHoverHighlights,
      onKeyDown,
    })
  }

  function onItemClick(e: React.MouseEvent<HTMLElement, MouseEvent>, compId: string) {
    assertString(compId)

    const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

    if (e[controlKeyName]) {
      if (pickedFCompIds.includes(compId)) {
        setPickedFCompIds(pickedFCompIds.filter((id) => id !== compId))
        return
      }
      setPickedFCompIds([...new Set([...pickedFCompIds, compId])])
      return
    }

    setPickedFCompIds([compId])
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>, compId: string | number) {
    assertString(compId)

    const controlKeyName = isMac() ? 'metaKey' : 'ctrlKey'

    if (e.key === 'Enter' && e[controlKeyName]) {
      if (pickedFCompIds.includes(compId)) {
        setPickedFCompIds(pickedFCompIds.filter((id) => id !== compId))
        return
      }
      setPickedFCompIds([...new Set([...pickedFCompIds, compId])])
      return
    }

    if (e.key === 'Enter') {
      setPickedFCompIds([compId])
    }
  }

  function onDragEnd(f: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to) {
      return
    }

    assertNotUndefined(tree)

    let tempComps = FSchemaHistory.data?.comps

    pickedFCompIds.forEach((compId) => {
      const from = findCompPosition(compId, tempComps)
      setTree(moveItemOnTree(tree, from, to))
      const comp = findComp(compId, tempComps)
      tempComps = moveComp(comp, to.parentId as string, to.index || 0, tempComps)
    })

    setFSchemaHistory(setFSchemaComps(tempComps))
  }

  /**
   *
    @description Пользователь может начать перетаскивать компонент, который не был выделен
    в результате перетащятся выделенные, а не перетаскиваемые
   */
  function PreventMovingUnpickedItems(compId: string | number) {
    assertString(compId)

    if (pickedFCompIds.includes(compId)) {
      return
    }

    setPickedFCompIds([compId])
  }

  return (
    <>
      <PrimaryButton className="addCompButton" onClick={() => setPaletteOpen(true)}>
        <FontIcon aria-label="Add Comp" iconName="Add" />
      </PrimaryButton>
      <PerfectScrollbar className="TreePanel">
        <div className="marginTopAndBottom">
          {tree && (
            <Tree tree={tree} onDragStart={PreventMovingUnpickedItems} onDragEnd={onDragEnd} setTree={setTree} />
          )}
        </div>
      </PerfectScrollbar>
    </>
  )
}

export default TreePanel
