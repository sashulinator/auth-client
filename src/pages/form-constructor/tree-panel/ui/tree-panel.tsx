import { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton, isMac } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './index.css'

import { buildTree } from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState } from 'recoil'

import { findEntity, findEntityPosition, moveEntity } from '@/lib/entity-actions'
import { paletteModalState } from '@/pages/form-constructor/palette-modal'
import {
  currentSchemaHistoryState,
  highlightHover,
  pickedFCompIdsState,
  removeAllHoverHighlights,
  setFSchemaComps,
} from '@/pages/form-constructor/preview'
import Tree from '@/shared/tree'

function TreePanel(): JSX.Element {
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const [pickedFCompIds, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(rebuildTree)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => setTree(rebuildTree), [currentSchemaHistory, pickedFCompIds])

  /**
   * Костыль! Tree требует чтобы высота родителя не менялась во время переноса компонента,
   * а PerfectScrollbar так и норовит ее поменять
   */
  useLayoutEffect(() => {
    if (wrapperRef.current && wrapperRef.current.firstElementChild) {
      const styles = window.getComputedStyle(wrapperRef.current.firstElementChild)
      wrapperRef.current.style.minHeight = `calc(${parseInt(styles.height, 10)}px + 30vh)`
    }
  }, [currentSchemaHistory.data])

  function rebuildTree() {
    return buildTree(currentSchemaHistory.data?.comps, {
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
    if (!to || to.parentId === 'rootId') {
      return
    }

    assertNotUndefined(tree)

    let tempComps = currentSchemaHistory.data?.comps

    pickedFCompIds.forEach((compId) => {
      const from = findEntityPosition(compId, tempComps)
      assertNotUndefined(from)
      setTree(moveItemOnTree(tree, from, to))
      const comp = findEntity(compId, tempComps)
      tempComps = moveEntity(comp, to.parentId as string, to.index || 0, tempComps)
    })

    setCurrentSchemaHistory(setFSchemaComps(tempComps))
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
        {tree && (
          <Tree
            renderItem={TreeLeaf}
            tree={tree}
            onDragStart={PreventMovingUnpickedItems}
            onDragEnd={onDragEnd}
            setTree={setTree}
          />
        )}
      </PerfectScrollbar>
    </>
  )
}

export default TreePanel
