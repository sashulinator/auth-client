import { TreeDestinationPosition, TreeSourcePosition, moveItemOnTree } from '@atlaskit/tree'
import { FontIcon, PrimaryButton } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import './index.css'

import { paletteModalState } from '../../palette-modal/model'
import { buildTree } from '../lib/build-tree'
import { highlightComponent, removeHighlight } from '../lib/highlight'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useRecoilValue } from 'recoil'

import { moveComps as moveComp, removeComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import Tree from '@/shared/tree'

function TreePanel(): JSX.Element {
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [pickedFCompId, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)
  const [tree, setTree] = useState(rebuildTree)
  const pickedFComp = useRecoilValue(pickedFCompState)
  useEffect(() => setTree(rebuildTree), [FSchema, pickedFCompId])
  useEffect(addDeleteKeyListener, [pickedFCompId])

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

  function addDeleteKeyListener() {
    function test(event: any): void {
      if (event.key === 'Backspace') {
        assertNotNull(pickedFComp)
        assertNotNull(FSchema)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((document?.activeElement as any)?.type === 'text') {
          return
        }

        const comps = removeComp(pickedFComp?.id, FSchema.comps)
        setPickedFCompId('')
        setTimeout(() => {
          setFSchema({ ...FSchema, comps })
          removeHighlight()
        })
      }
    }

    if (pickedFCompId) {
      document.removeEventListener('keydown', test)
      document.addEventListener('keydown', test)
    } else {
      document.removeEventListener('keydown', test)
    }

    // Удаляем слушатель при уничтожении компонента
    return () => {
      document.removeEventListener('keydown', test)
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
