import { TreeData, TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
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
import { Button } from '@/shared/button'
import LoadingAria from '@/shared/loading-aria'
import { Comp, CompSchema, CreateCompSchema, Dictionary, LinkedComp } from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

export interface TreeProps {
  schema: CompSchema | CreateCompSchema
  schemas: Dictionary<CompSchema> | null
  selectedCompIds: string[]
  searchQuery?: string
  isLoading: boolean
  toggleCompSelection: (compId: string | string[]) => void
  upsertComps: (comps: Dictionary<Comp | LinkedComp>) => void
  updateComp: (comp: Comp) => void
}

export default function PanelTree(props: TreeProps): JSX.Element {
  const [tree, setTree] = useState<TreeData | undefined>()
  const [editId, setEditId] = useState<string | undefined>()
  const [, startTransition] = useTransition()

  useEffect(rebuildTree, [props.schema, props.searchQuery, props.schemas])

  function rebuildTree() {
    startTransition(() => {
      const newTree = buildTree(tree, props.schema.data, {
        search: {
          query: props.searchQuery,
          fieldNames: ['id', 'title'],
        },
        isInitialExpanded: Object.keys(props.schema.data).length < 500,
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
      props.toggleCompSelection(compId)
    } else {
      props.toggleCompSelection([compId])
    }
  }

  function selectOnEnterKey(e: React.KeyboardEvent<HTMLDivElement>, compId: string | number) {
    assertString(compId)

    if (isEnter(e) && isCtrl(e)) {
      props.toggleCompSelection(compId)
    } else if (isEnter(e)) {
      props.toggleCompSelection([compId])
    }
  }

  function onDragEnd(f: TreeSourcePosition, to?: TreeDestinationPosition) {
    if (!to || to.parentId === 'rootId') {
      return
    }

    assertNotUndefined(tree)

    let tempComps = props.schema.data
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

    props.toggleCompSelection([compId])
  }

  return (
    <PerfectScrollbar className="treePanelScrollable">
      <LoadingAria loading={props.isLoading} label="Schema loading...">
        {!props.isLoading && (
          <Button
            variant="action"
            styles={getRootCompButtonStyles(props.selectedCompIds)}
            onClick={() => props.toggleCompSelection([ROOT_ID])}
            text={props?.schema?.data?.[ROOT_ID]?.title}
          />
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

function getRootCompButtonStyles(selectedCompIds: string[]) {
  return {
    root: {
      borderRadius: '0',
      width: '100%',
      backgroundColor: selectedCompIds.includes(ROOT_ID) ? 'var(--themePrimary03)' : 'transparent',
    },
    rootHovered: {
      backgroundColor: selectedCompIds.includes(ROOT_ID) ? 'var(--themePrimary03)' : 'var(--themePrimary01)',
    },
  }
}
