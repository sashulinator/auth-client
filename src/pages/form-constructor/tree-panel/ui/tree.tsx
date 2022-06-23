import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { ActionButton } from '@fluentui/react'
import { assertNotUndefined, assertString } from '@savchenko91/schema-validator'

import './tree-panel.css'

import { AreaClassNames } from '../../preview/constants/area-classnames'
import TreeNode from './tree-node'
import React, { useEffect, useState, useTransition } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { ROOT_ID } from '@/constants/common'
import { findEntity, findEntityPosition, moveEntity } from '@/lib/entity-actions'
import { isCtrl, isEnter } from '@/lib/key-events'
import { highlightHovered, removeAllHighlights } from '@/pages/form-constructor/preview'
import LoadingAria from '@/shared/loading-aria'
import { Catalog, Comp, CompSchema } from '@/shared/schema-drawer'
import Tree from '@/shared/tree'
import { buildTree } from '@/shared/tree/lib/build-tree'

export interface TreeProps {
  selectAndUnselectComp: (compId: string | string[]) => void
  schema: CompSchema
  selectedCompIds: string[]
  upsertComps: (comps: Catalog<Comp>) => void
  isLoading: boolean
  schemas: Catalog<CompSchema> | null
  searchQuery?: string
  updateComp: (comp: Comp) => void
}

export default function PanelTree(props: TreeProps): JSX.Element {
  const [tree, setTree] = useState<TreeData | undefined>()
  const [editId, setEditId] = useState<string | undefined>()
  const [, startTransition] = useTransition()

  useEffect(rebuildTree, [props.schema])

  function rebuildTree() {
    startTransition(() => {
      const newTree = buildTree(tree, props.schema.catalog, {
        searchQuery: props.searchQuery,
        schemas: props.schemas,
        editId,
        onItemClick,
        onDoubleClick,
        onMouseOver: highlightHovered,
        onKeyDown: selectOnEnterKey,
        updateComp: props.updateComp,
      })

      setTree(newTree)
    })
  }

  function onDoubleClick(compId?: string) {
    setEditId(compId)
  }

  function onItemClick(e: React.MouseEvent<HTMLElement, MouseEvent>, compId: string, selectedCompIds: string[]) {
    assertString(compId)

    if (selectedCompIds.includes(compId)) {
      return
    }

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

    let tempComps = props.schema.catalog
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
    setEditId(undefined)

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
                backgroundColor: props.selectedCompIds.includes(ROOT_ID) ? 'var(--themePrimary03)' : 'transparent',
              },
              rootHovered: {
                backgroundColor: props.selectedCompIds.includes(ROOT_ID)
                  ? 'var(--themePrimary03)'
                  : 'var(--themePrimary01)',
              },
            }}
            onClick={() => props.selectAndUnselectComp([ROOT_ID])}
          >
            ROOT
          </ActionButton>
        )}
        {tree && (
          <Tree
            renderItem={TreeNode}
            tree={tree}
            onDragStart={PreventMovingUnpickedItems}
            onDragEnd={onDragEnd}
            setTree={setTree}
            onMouseLeave={() => removeAllHighlights(AreaClassNames.hover)}
          />
        )}
      </LoadingAria>
    </PerfectScrollbar>
  )
}
