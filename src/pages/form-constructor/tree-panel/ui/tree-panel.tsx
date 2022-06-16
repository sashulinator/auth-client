import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { ActionButton } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './tree-panel.css'

import { buildTree } from '../lib/build-tree'
import TreeLeaf from './tree-leaf'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { ROOT_ID } from '@/constants/common'
import { findEntity, findEntityPosition, moveEntity } from '@/lib/entity-actions'
import { isCtrl, isEnter } from '@/lib/key-events'
import { highlightHover, removeAllHoverHighlights } from '@/pages/form-constructor/preview'
import LoadingAria from '@/shared/loading-aria'
import { Catalog, Comp, CompSchema } from '@/shared/schema-drawer'
import Tree from '@/shared/tree'

interface TreePanelProps {
  selectAndUnselectComp: (compId: string | string[]) => void
  schema: CompSchema
  selectedCompIds: string[]
  upsertComps: (comps: Catalog<Comp>) => void
  isLoading: boolean
  schemas: Catalog<CompSchema> | null
  searchQuery?: string
}

export default function TreePanel(props: TreePanelProps): JSX.Element {
  const [tree, setTree] = useState<TreeData | undefined>()

  useEffect(() => setTree(rebuildTree), [props.schema, props.selectedCompIds, props.searchQuery])

  function rebuildTree(): TreeData | undefined {
    return buildTree(tree, props.schema.comps, {
      pickedIds: props.selectedCompIds,
      onItemClick,
      onMouseOver: highlightHover,
      onFocus: highlightHover,
      onBlur: removeAllHoverHighlights,
      onMouseLeave: removeAllHoverHighlights,
      onKeyDown: selectOnEnterKey,
      schemas: props.schemas,
      searchQuery: props.searchQuery,
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
    <PerfectScrollbar className="treePanelScrollable">
      <LoadingAria loading={props.isLoading} label="Schema loading...">
        {!props.isLoading && (
          <ActionButton
            styles={{
              root: {
                borderRadius: '0',
                width: '100%',
                backgroundColor: props.selectedCompIds.includes(ROOT_ID)
                  ? 'var(--themePrimaryTransparent03)'
                  : 'transparent',
              },
              rootHovered: {
                backgroundColor: props.selectedCompIds.includes(ROOT_ID)
                  ? 'var(--themePrimaryTransparent03)'
                  : 'var(--themePrimaryTransparent01)',
              },
            }}
            onClick={() => props.selectAndUnselectComp([ROOT_ID])}
          >
            ROOT
          </ActionButton>
        )}
        {tree && (
          <Tree
            renderItem={TreeLeaf}
            tree={tree}
            onDragStart={PreventMovingUnpickedItems}
            onDragEnd={onDragEnd}
            setTree={setTree}
          />
        )}
      </LoadingAria>
    </PerfectScrollbar>
  )
}
