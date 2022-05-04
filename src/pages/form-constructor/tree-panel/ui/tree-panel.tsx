import { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton, isMac } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './index.css'

import { buildTree } from '../lib/build-tree'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState } from 'recoil'

import { findCompLocation, moveComp } from '@/helpers/form-schema-state'
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

  function rebuildTree() {
    return buildTree(FSchema?.comps, {
      pickedIds: pickedFCompIds,
      onItemClick,
      onMouseOver: highlightComponent,
      onFocus: highlightComponent,
      onBlur: removeHighlight,
      onMouseLeave: removeHighlight,
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

    let tempComps = FSchema.comps

    pickedFCompIds.forEach((compId) => {
      const from = findCompLocation(compId, tempComps)
      setTree(moveItemOnTree(tree, from, to))
      tempComps = moveComp(tempComps, from, to)
    })

    setFSchema({ ...FSchema, comps: tempComps })
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
