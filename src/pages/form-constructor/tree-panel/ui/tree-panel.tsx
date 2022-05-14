import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './index.css'

import { buildTree } from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState } from 'recoil'

import { Comp, Norm, Schema } from '@/entities/schema'
import { findEntity, findEntityPosition, moveEntity } from '@/lib/entity-actions'
import { isCtrl, isEnter } from '@/lib/key-events'
import { paletteModalState } from '@/pages/form-constructor/palette-modal'
import { highlightHover, removeAllHoverHighlights } from '@/pages/form-constructor/preview'
import Tree from '@/shared/tree'

interface TreePanelProps {
  selectAndUnselectComp: (compId: string | string[]) => void
  schema: Schema
  selectedCompIds: string[]
  upsertComps: (comps: Norm<Comp>) => void
}

function TreePanel(props: TreePanelProps): JSX.Element {
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState<TreeData | undefined>()

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => setTree(rebuildTree), [props.schema, props.selectedCompIds])

  /**
   * Костыль! Tree требует чтобы высота родителя не менялась во время переноса компонента,
   * а PerfectScrollbar так и норовит ее поменять
   */
  useLayoutEffect(() => {
    if (wrapperRef.current && wrapperRef.current.firstElementChild) {
      const styles = window.getComputedStyle(wrapperRef.current.firstElementChild)
      wrapperRef.current.style.minHeight = `calc(${parseInt(styles.height, 10)}px + 30vh)`
    }
  }, [props.schema])

  function rebuildTree(): TreeData | undefined {
    return buildTree(tree, props.schema.comps, {
      pickedIds: props.selectedCompIds,
      onItemClick,
      onMouseOver: highlightHover,
      onFocus: highlightHover,
      onBlur: removeAllHoverHighlights,
      onMouseLeave: removeAllHoverHighlights,
      onKeyDown: selectOnEnterKey,
    })
  }

  function onItemClick(e: React.MouseEvent<HTMLElement, MouseEvent>, compId: string) {
    assertString(compId)

    if (isCtrl(e)) {
      props.selectAndUnselectComp(compId)
    } else {
      props.selectAndUnselectComp([compId])
    }
  }

  function selectOnEnterKey(e: React.KeyboardEvent<HTMLDivElement>, compId: string | number) {
    assertString(compId)

    if (isEnter(e) && isCtrl(e)) {
      props.selectAndUnselectComp(compId)
    } else if (isEnter(e)) {
      props.selectAndUnselectComp([compId])
    }
  }

  function onDragEnd(f: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || to.parentId === 'rootId') {
      return
    }

    assertNotUndefined(tree)

    let tempComps = props.schema.comps
    let tempTree = tree

    props.selectedCompIds.forEach((compId) => {
      const from = findEntityPosition(compId, tempComps)
      assertNotUndefined(from)
      tempTree = moveItemOnTree(tempTree, from, to)
      const comp = findEntity(compId, tempComps)
      tempComps = moveEntity(comp, to.parentId as string, to.index || 0, tempComps)
    })

    // Запускаем с таймаутом чтобы не моргал item
    setTree(tempTree)
    setTimeout(() => props.upsertComps(tempComps), 0)
  }

  /**
    @description Пользователь может начать перетаскивать компонент, который не был выделен
    в результате перетащятся выделенные, а не перетаскиваемые
   */
  function PreventMovingUnpickedItems(compId: string | number) {
    assertString(compId)

    if (props.selectedCompIds.includes(compId)) {
      return
    }

    props.selectAndUnselectComp([compId])
  }

  return (
    <>
      <PrimaryButton className="addCompButton" onClick={() => setPaletteOpen(true)}>
        <FontIcon aria-label="Add Comp" iconName="Add" />
      </PrimaryButton>
      {tree && (
        <PerfectScrollbar className="TreePanel">
          <Tree
            renderItem={TreeLeaf}
            tree={tree}
            onDragStart={PreventMovingUnpickedItems}
            onDragEnd={onDragEnd}
            setTree={setTree}
          />
        </PerfectScrollbar>
      )}
    </>
  )
}

export default TreePanel
