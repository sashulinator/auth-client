import { Stack } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import './form-constructor.css'

import {
  currentSchemaHistoryState,
  setFSchemaComps,
  setNext,
  setPrev,
  upsertCurrentSchemaComp,
} from '../../entities/schema/model/current-schema'
import CompPanel from './comp-panel'
import { lackOfCSchemaIdsState, schemasState, selectedCompSchemaState } from './comp-panel/model/comp-schema'
import KeyListener from './key-listener'
import PaletteModal from './palette-modal'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { getSchema, useGetDependencySchemas } from '@/api/schema'
import { schemaValidator } from '@/common/schemas'
import { Comp, Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import { selectedCompIdsState } from '@/entities/schema'
import { getSelectedComp } from '@/entities/schema/lib/selected-comp'
import CompContextualMenu from '@/entities/schema/ui/contextual-menu'
import {
  addEntity,
  copyEntities,
  findDependencyIds,
  findEntities,
  findEntityPosition,
  findRootParentIds,
  removeEntity,
} from '@/lib/entity-actions'
import { InitialContext } from '@/shared/draw-comps'
import Header from '@/widgets/header'

const FormConstructor: FC = (): JSX.Element => {
  const { id } = useParams()

  const [schemas, setSchemas] = useRecoilState(schemasState)
  const [selectedCompIds, setSelectedCompIds] = useRecoilState(selectedCompIdsState)
  const [selectedCompSchema, setSelectedCompSchema] = useRecoilState(selectedCompSchemaState)
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const lackOfCSchemaIds = useRecoilValue(lackOfCSchemaIdsState)
  const resetCSchemas = useResetRecoilState(schemasState)
  const resetFSchema = useResetRecoilState(currentSchemaHistoryState)
  const resetPickedFCompId = useResetRecoilState(selectedCompIdsState)

  const selectedComp = getSelectedComp(currentSchemaHistory.data, selectedCompIds)
  const context: InitialContext = {
    states: {
      schemas,
      currentSchema: currentSchemaHistory.data,
      selectedCompIds,
      selectedComp,
      selectedCompSchema,
    },
    functions: {
      setCurrentSchemaHistory,
      setSelectedCompIds,
    },
  }

  const { data: fetchedCurrentSchema } = useQuery(['schema', id], getSchema)

  const { data: fetchedDependencySchemas, isLoading: isDependencySchemasLoading } = useGetDependencySchemas(
    lackOfCSchemaIds
  )

  useEffect(() => {
    resetCSchemas()
    resetFSchema()
    resetPickedFCompId()
  }, [])
  useEffect(setFetchedCurrentSchemaToState, [fetchedCurrentSchema])
  useEffect(updateSelectedCompSchema, [selectedComp, schemas])
  useEffect(setFetchedSchemasToState, [fetchedDependencySchemas])

  function setFetchedCurrentSchemaToState() {
    if (fetchedCurrentSchema !== undefined) {
      setCurrentSchemaHistory({ next: null, data: fetchedCurrentSchema, prev: null })
    }
  }

  function setFetchedSchemasToState() {
    if (fetchedDependencySchemas !== undefined) {
      setSchemas({ ...fetchedDependencySchemas, ...schemas })
    }
  }

  function updateSelectedCompSchema() {
    if (selectedComp?.compSchemaId) {
      setSelectedCompSchema(schemas?.[selectedComp?.compSchemaId] ?? null)
    }
  }

  function upsertCompToCurrentSchemaState(comp: Comp) {
    setCurrentSchemaHistory(upsertCurrentSchemaComp(comp))
  }

  function upsertCompsToCurrentSchemaState(comps: Norm<Comp>) {
    setCurrentSchemaHistory(setFSchemaComps(comps))
  }

  function removeCompFromState(compId: string): void {
    assertNotNull(currentSchemaHistory)

    const comps = removeEntity(compId, currentSchemaHistory.data.comps)
    assertNotUndefined(comps)

    setCurrentSchemaHistory(setFSchemaComps(comps))

    if (compId === selectedComp?.id) {
      setSelectedCompIds([])
    }
  }

  function openSchemaInNewTab(schemaId: string): void {
    const url = ROUTES.FORM_CONSTRUCTOR.buildURL(schemaId)
    window.open(url, '_blanc')?.focus()
  }

  function selectAndUnselectComp(compId: string | string[]): void {
    if (Array.isArray(compId)) {
      setSelectedCompIds(compId)
      return
    }

    if (selectedCompIds.includes(compId)) {
      setSelectedCompIds(selectedCompIds.filter((id) => id !== compId))
    } else {
      setSelectedCompIds([...new Set([...selectedCompIds, compId])])
    }
  }

  function removeSelectedComps() {
    selectedCompIds.forEach((id) => {
      removeCompFromState(id)
    })
  }

  function keepCompsSelected(ids: string[] = []) {
    const absentIds = selectedCompIds.filter((id) => !ids.includes(id))
    const selectedIds = selectedCompIds.filter((id) => !absentIds.includes(id))
    setSelectedCompIds(selectedIds)
  }

  function undo() {
    if (currentSchemaHistory.prev) {
      // TODO проверяет только в корне а надо везде!!
      keepCompsSelected(currentSchemaHistory.prev.data.comps[ROOT_ID]?.children)
    }
    setCurrentSchemaHistory(setPrev)
  }

  function redo() {
    if (currentSchemaHistory.next) {
      // TODO проверяет только в корне а надо везде!!
      keepCompsSelected(currentSchemaHistory.next.data.comps[ROOT_ID]?.children)
    }
    setCurrentSchemaHistory(setNext)
  }

  function copyToClipboard() {
    const dependencyIds = findDependencyIds(selectedCompIds, currentSchemaHistory.data.comps)
    const selectedComps = findEntities(dependencyIds, currentSchemaHistory.data.comps)
    localStorage.setItem('copyClipboard', JSON.stringify(selectedComps))
  }

  // TODO разбить на подфункции
  function pasteFromClipboard() {
    const stringifiedComps = localStorage.getItem('copyClipboard') || ''

    const comps = JSON.parse(stringifiedComps) as Norm<Comp>

    schemaValidator.comps(comps)

    if (comps) {
      const copiedComps = copyEntities(comps, ['path'])

      const rootCompIds = findRootParentIds(copiedComps)
      const rootComps = findEntities(rootCompIds, copiedComps)

      const mergedComps = { ...currentSchemaHistory.data.comps, ...copiedComps }

      const isRoot = selectedCompIds.includes(ROOT_ID)
      const isToRoot = selectedCompIds.length === 0 || isRoot

      const newComps = Object.values(rootComps).reduce((acc, comp) => {
        if (isToRoot) {
          acc = addEntity(comp, ROOT_ID, 0, acc)
        } else {
          const position = findEntityPosition(selectedCompIds[0] || '', acc)
          assertNotUndefined(position)
          acc = addEntity(comp, position.parentId.toString(), position.index + 1, acc)
        }
        return acc
      }, mergedComps)

      setCurrentSchemaHistory(setFSchemaComps(newComps))

      if (selectedCompIds.length === 0) {
        setSelectedCompIds(comps[0] ? [comps[0].id] : [])
      }
    }
  }

  return (
    <>
      <KeyListener
        selectedCompIds={selectedCompIds}
        schema={currentSchemaHistory.data}
        selectAndUnselectComp={selectAndUnselectComp}
        removeSelectedComps={removeSelectedComps}
        pasteFromClipboard={pasteFromClipboard}
        copyToClipboard={copyToClipboard}
        undo={undo}
        redo={redo}
      />
      <Header />
      <div className="fakeHeader" />
      <Stack as="main" className="FormConstructor">
        <TreePanel
          schema={currentSchemaHistory.data}
          selectAndUnselectComp={selectAndUnselectComp}
          upsertComps={upsertCompsToCurrentSchemaState}
          selectedCompIds={selectedCompIds}
        />
        <Preview context={context} />
        <CompPanel
          onSubmit={upsertCompToCurrentSchemaState}
          isLoading={isDependencySchemasLoading}
          context={context}
          ContextualMenu={(props) => (
            <CompContextualMenu
              comp={props.comp}
              schemas={schemas}
              remove={removeCompFromState}
              openSchemaInNewTab={openSchemaInNewTab}
            />
          )}
        />
        <PaletteModal />
      </Stack>
    </>
  )
}

export default FormConstructor
