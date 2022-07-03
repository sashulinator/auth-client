import { Stack } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import './form-constructor.css'

import CompPanel from './comp-panel'
import HeaderContent from './header-content'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import uuid from 'uuid-random'

import { getSchema, useGetDependencySchemas } from '@/api/schema'
import { schemaValidator } from '@/common/schemas'
import { ROOT_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import {
  CompContextualMenu,
  currentSchemaHistoryState,
  defineSelectedComp as definePropertyPanelComp,
  findCompSchema,
  findMissingSchemaIds,
  nextSetter,
  prevSetter,
  schemasState,
  selectedCompIdsState,
  selectedCompSchemaState,
  updateCompSetter,
  updateCompsSetter,
} from '@/entities/schema'
import {
  addEntity,
  copyEntities,
  findDependencyIds,
  findEntities,
  findEntity,
  findEntityPosition,
  findRootParentIds,
  removeEntity,
} from '@/lib/entity-actions'
import { Catalog, Comp } from '@/shared/schema-drawer'

const FormConstructor: FC = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [schemas, setSchemas] = useRecoilState(schemasState)
  const [selectedCompIds, setSelectedCompIds] = useRecoilState(selectedCompIdsState)
  const [selectedCompSchema, setSelectedCompSchema] = useRecoilState(selectedCompSchemaState)
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const resetSchemas = useResetRecoilState(schemasState)
  const resetCurrentSchemaHistory = useResetRecoilState(currentSchemaHistoryState)
  const resetSelectedCompIds = useResetRecoilState(selectedCompIdsState)
  const missingSchemaIds = useMemo(() => findMissingSchemaIds(currentSchemaHistory.data, schemas), [
    currentSchemaHistory.data,
  ])
  const propertyPanelComp = definePropertyPanelComp(currentSchemaHistory.data, selectedCompIds)
  const propertyPanelSchema = findCompSchema(propertyPanelComp, schemas)
  const context = {
    states: {
      schemas,
      currentSchema: currentSchemaHistory.data,
      selectedCompIds,
      propertyPanelComp,
      selectedCompSchema,
    },
    fns: {
      setSelectedCompIds,
    },
  }

  const { data: fetchedCurrentSchema, isLoading: isCurrentSchemaLoading } = useQuery(['schema', id], getSchema)

  const { data: fetchedDependencySchemas, isLoading: isDependencySchemasLoading } = useGetDependencySchemas(
    missingSchemaIds
  )

  useEffect(() => {
    resetSchemas()
    resetCurrentSchemaHistory()
    resetSelectedCompIds()
  }, [])
  useEffect(setFetchedCurrentSchemaToState, [fetchedCurrentSchema])
  useEffect(updateSelectedCompSchema, [propertyPanelComp, schemas])
  useEffect(setFetchedSchemasToState, [fetchedDependencySchemas])
  useEffect(updateSchemas, [currentSchemaHistory.data])

  function setFetchedCurrentSchemaToState() {
    if (fetchedCurrentSchema !== undefined) {
      setCurrentSchemaHistory({ next: null, data: fetchedCurrentSchema, prev: null })
      setSchemas({ [fetchedCurrentSchema.id]: fetchedCurrentSchema, ...schemas })
    }
  }

  function setFetchedSchemasToState() {
    if (fetchedDependencySchemas !== undefined) {
      setSchemas({ ...fetchedDependencySchemas, ...schemas })
    }
  }

  function updateSelectedCompSchema() {
    if (propertyPanelComp?.compSchemaId) {
      setSelectedCompSchema(schemas?.[propertyPanelComp?.compSchemaId] ?? null)
    }
  }

  function updateSchemas() {
    if (currentSchemaHistory.data === null) {
      setSchemas({ ...schemas })
    } else {
      setSchemas({ [currentSchemaHistory.data.id]: currentSchemaHistory.data, ...schemas })
    }
  }

  // TODO rename to updateComp
  function updateCompInCurrentSchemaState(comp: Comp) {
    setCurrentSchemaHistory(updateCompSetter(comp))
  }

  function updateCompsInCurrentSchemaState(comps: Catalog<Comp>) {
    setCurrentSchemaHistory(updateCompsSetter(comps))
  }

  function removeCompFromState(compId: string): void {
    assertNotNull(currentSchemaHistory.data)

    const comps = removeEntity(compId, currentSchemaHistory.data.data)
    assertNotUndefined(comps)

    setCurrentSchemaHistory(updateCompsSetter(comps))

    if (compId === propertyPanelComp?.id) {
      const compLocation = findEntityPosition(compId, currentSchemaHistory.data.data)
      const parentComp = findEntity(compLocation?.parentId || '', comps)
      const siblingId = parentComp.children?.[compLocation?.index || 0]
      siblingId ? setSelectedCompIds([siblingId]) : setSelectedCompIds([])
    }
  }

  function openSchemaInNewTab(schemaId: string): void {
    const url = ROUTES.FORM_CONSTRUCTOR_EDIT.PATH.replace(':id', schemaId)
    window.open(url, '_blanc')?.focus()
  }

  function toggleCompSelection(compId: string | string[]): void {
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
    if (currentSchemaHistory.prev?.data) {
      // TODO проверяет только в корне а надо везде!!
      keepCompsSelected(currentSchemaHistory.prev.data.data[ROOT_ID]?.children)
    }
    setCurrentSchemaHistory(prevSetter)
  }

  function redo() {
    if (currentSchemaHistory.next?.data) {
      // TODO проверяет только в корне а надо везде!!
      keepCompsSelected(currentSchemaHistory.next.data.data[ROOT_ID]?.children)
    }
    setCurrentSchemaHistory(nextSetter)
  }

  function copyToClipboard() {
    assertNotNull(currentSchemaHistory.data)
    const dependencyIds = findDependencyIds(selectedCompIds, currentSchemaHistory.data.data)
    const selectedComps = findEntities(dependencyIds, currentSchemaHistory.data.data)
    localStorage.setItem('copyClipboard', JSON.stringify(selectedComps))
  }

  function pasteFromClipboard() {
    const stringifiedComps = localStorage.getItem('copyClipboard') || ''

    const comps = JSON.parse(stringifiedComps) as Catalog<Comp>

    schemaValidator.data(comps)

    if (comps) {
      addNewComps(comps)

      if (selectedCompIds.length === 0) {
        setSelectedCompIds(comps[0] ? [comps[0].id] : [])
      }
    }
  }

  function addNewComps(comps: Catalog<Comp>) {
    const copiedComps = copyEntities(comps, ['name'])

    const rootCompIds = findRootParentIds(copiedComps)
    const rootComps = findEntities(rootCompIds, copiedComps)

    assertNotNull(currentSchemaHistory.data)
    const mergedComps = { ...currentSchemaHistory.data.data, ...copiedComps }

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

    setCurrentSchemaHistory(updateCompsSetter(newComps))
  }

  async function copySchema() {
    assertNotNull(currentSchemaHistory.data)
    const response = await fetch('/api/v1/schemas', {
      method: 'POST',
      // TODO копируется текущий стейт а не тот что пришел с сервера
      body: JSON.stringify({
        ...currentSchemaHistory.data,
        id: uuid(),
        title: `${currentSchemaHistory.data.title}_copy`,
      }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    const data = await response.json()

    if (response.ok) {
      navigate(ROUTES.FORM_CONSTRUCTOR_EDIT.PATH.replace(':id', data.id))
    }
  }

  async function deleteSchema() {
    assertNotNull(currentSchemaHistory.data)
    const response = await fetch('/api/v1/schemas', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [currentSchemaHistory.data.id] }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    if (response.ok) {
      navigate(ROUTES.SCHEMA_LIST.PATH)
    }
  }

  return (
    <Stack className="headerOnlyLayout">
      <HeaderContent deleteSchema={deleteSchema} copySchema={copySchema} />
      <Stack as="main" className="FormConstructor">
        <TreePanel
          schema={currentSchemaHistory.data}
          schemas={schemas}
          toggleCompSelection={toggleCompSelection}
          upsertComps={updateCompsInCurrentSchemaState}
          selectedCompIds={selectedCompIds}
          isLoading={isCurrentSchemaLoading}
          updateComp={updateCompInCurrentSchemaState}
          isCurrentSchemaLoading={isCurrentSchemaLoading}
          isDependencySchemasLoading={isDependencySchemasLoading}
          addNewComps={addNewComps}
          removeSelectedComps={removeSelectedComps}
          pasteFromClipboard={pasteFromClipboard}
          copyToClipboard={copyToClipboard}
          undo={undo}
          redo={redo}
        />
        <div className="PreviewPanel">
          <Preview
            isLoading={isDependencySchemasLoading}
            schema={currentSchemaHistory.data}
            schemas={schemas}
            selectedCompIds={selectedCompIds}
          />
        </div>
        <CompPanel
          previewSchema={currentSchemaHistory.data}
          onSubmit={updateCompInCurrentSchemaState}
          isLoading={isDependencySchemasLoading}
          context={context}
          schemas={schemas}
          schema={propertyPanelSchema}
          comp={propertyPanelComp}
          ContextualMenu={(props) => (
            <CompContextualMenu
              comp={props.comp}
              schemas={schemas}
              remove={removeCompFromState}
              openSchemaInNewTab={openSchemaInNewTab}
            />
          )}
        />
      </Stack>
    </Stack>
  )
}

export default FormConstructor
