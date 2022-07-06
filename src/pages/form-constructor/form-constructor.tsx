import { Stack } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import './form-constructor.css'

import CompPanel from './comp-panel'
import compSchema from './constants/comp-schema'
import HeaderContent from './header-content'
import Preview from './preview'
import TreePanel from './tree-panel'
import React, { FC, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import uuid from 'uuid-random'

import { getCompSchema, useGetDependencySchemas } from '@/api/comp-schema'
import { schemaValidator } from '@/common/schemas'
import { ROOT_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import {
  CompContextualMenu,
  defineSelectedComp as definePropertyPanelComp,
  findCompSchema,
  findMissingSchemaIds,
  schemasState,
  selectedCompIdsState,
  selectedCompSchemaState,
} from '@/entities/schema'
import { replace } from '@/lib/change-unmutable'
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
import { useHistoryLinkedList } from '@/lib/use-history-linked-list'
import {
  Catalog,
  Comp,
  CompSchema,
  CreateCompSchema,
  LinkedComp,
  assertHasId,
  assertNotLinkedComp,
  hasId,
  isComp,
  isLinkedComp,
} from '@/shared/schema-drawer'

const FormConstructor: FC = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [schemas, setSchemas] = useRecoilState(schemasState)
  const [selectedCompIds, setSelectedCompIds] = useRecoilState(selectedCompIdsState)
  const [selectedCompSchema, setSelectedCompSchema] = useRecoilState(selectedCompSchemaState)
  const dll = useHistoryLinkedList([compSchema, selectedCompIds] as const)
  const [currentCompSchema] = dll.current().getValue()

  const resetSchemas = useResetRecoilState(schemasState)
  const resetSelectedCompIds = useResetRecoilState(selectedCompIdsState)
  const missingSchemaIds = useMemo(() => findMissingSchemaIds(currentCompSchema, schemas), [currentCompSchema])
  const propertyPanelComp = definePropertyPanelComp(currentCompSchema, selectedCompIds)
  const propertyPanelSchema = findCompSchema(propertyPanelComp, schemas)
  const context = {
    states: {
      schemas,
      currentSchema: currentCompSchema,
      selectedCompIds,
      propertyPanelComp,
      selectedCompSchema,
    },
    fns: {
      setSelectedCompIds,
    },
  }

  const { data: fetchedCurrentSchema, isLoading: isCurrentSchemaLoading } = useQuery(['schema', id], getCompSchema)

  const { data: fetchedDependencySchemas, isLoading: isDependencySchemasLoading } = useGetDependencySchemas(
    missingSchemaIds
  )

  useEffect(() => {
    resetSchemas()
    resetSelectedCompIds()
  }, [])
  useEffect(setFetchedCurrentSchemaToState, [fetchedCurrentSchema])
  useEffect(updateSelectedCompSchema, [propertyPanelComp, schemas])
  useEffect(setFetchedSchemasToState, [fetchedDependencySchemas])
  useEffect(updateSchemas, [currentCompSchema])

  function setFetchedCurrentSchemaToState() {
    if (fetchedCurrentSchema !== undefined) {
      dll.removeEach(() => true)
      dll.insertLast([fetchedCurrentSchema, selectedCompIds])
      setSchemas({ [fetchedCurrentSchema.id]: fetchedCurrentSchema, ...schemas })
    }
  }

  function setFetchedSchemasToState() {
    if (fetchedDependencySchemas !== undefined) {
      setSchemas({ ...fetchedDependencySchemas, ...schemas })
    }
  }

  function setCompSchema(compSchema: CompSchema | CreateCompSchema) {
    dll.insertLast([compSchema, selectedCompIds])
  }

  function updateSelectedCompSchema() {
    if (isComp(propertyPanelComp)) {
      setSelectedCompSchema(schemas?.[propertyPanelComp.compSchemaId] ?? null)
    }

    if (isLinkedComp(propertyPanelComp)) {
      setSelectedCompSchema(schemas?.[propertyPanelComp.linkedSchemaId] ?? null)
    }
  }

  function updateSchemas() {
    if (hasId(currentCompSchema)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSchemas({ [currentCompSchema.id]: currentCompSchema, ...schemas })
    } else {
      setSchemas({ ...schemas })
    }
  }

  // TODO rename to updateComp
  function updateCompInCurrentSchemaState(comp: Comp) {
    assertNotNull(currentCompSchema)
    const newData = replace(currentCompSchema.data, comp.id, comp)
    dll.insertLast([{ ...currentCompSchema, data: newData }, selectedCompIds])
  }

  function updateCompsInCurrentSchemaState(comps: Catalog<Comp | LinkedComp>) {
    assertNotNull(currentCompSchema)
    dll.insertLast([{ ...currentCompSchema, data: comps }, selectedCompIds])
  }

  function removeCompFromState(compId: string): void {
    assertNotNull(currentCompSchema)

    const comps = removeEntity(compId, currentCompSchema.data)
    assertNotUndefined(comps)

    assertNotNull(currentCompSchema)

    if (compId === propertyPanelComp?.id) {
      const compLocation = findEntityPosition(compId, currentCompSchema.data)
      const parentComp = findEntity(compLocation?.parentId || '', comps)
      assertNotLinkedComp(parentComp)
      const siblingId = parentComp.children?.[compLocation?.index || 0]

      const newSelected = siblingId ? [siblingId] : []

      setSelectedCompIds(newSelected)

      dll.insertLast([{ ...currentCompSchema, data: comps }, newSelected])
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

  function undo() {
    if (!dll.isPrevCurrent()) {
      return
    }

    dll.setIndex(dll.getIndex() - 1)
    const [, newSelectedCompIds] = dll.current().getValue()
    setSelectedCompIds(newSelectedCompIds)
  }

  function redo() {
    if (!dll.isNextCurrent()) {
      return
    }

    dll.setIndex(dll.getIndex() + 1)
    const [, newSelectedCompIds] = dll.current().getValue()
    setSelectedCompIds(newSelectedCompIds)
  }

  function copyToClipboard() {
    assertNotNull(currentCompSchema)
    const dependencyIds = findDependencyIds(selectedCompIds, currentCompSchema.data)
    const selectedComps = findEntities(dependencyIds, currentCompSchema.data)
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

  function addNewComps(comps: Catalog<Comp | LinkedComp>) {
    const copiedComps = copyEntities(comps, ['name'])

    const rootCompIds = findRootParentIds(copiedComps)
    const rootComps = findEntities(rootCompIds, copiedComps)

    assertNotNull(currentCompSchema)

    const mergedComps = { ...currentCompSchema.data, ...copiedComps }

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

    dll.insertLast([{ ...currentCompSchema, data: newComps }, Object.keys(copiedComps)])
  }

  async function copySchema() {
    assertNotNull(currentCompSchema)

    const response = await fetch('/api/v1/schemas', {
      method: 'POST',
      // TODO копируется текущий стейт а не тот что пришел с сервера
      body: JSON.stringify({
        ...currentCompSchema,
        id: uuid(),
        title: `${currentCompSchema.title}_copy`,
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
    assertNotNull(currentCompSchema)
    assertHasId(currentCompSchema)
    const response = await fetch('/api/v1/schemas', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [currentCompSchema.id] }),
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
      <HeaderContent
        compSchema={currentCompSchema}
        setCompSchema={setCompSchema}
        deleteCompSchema={deleteSchema}
        copyCompSchema={copySchema}
      />
      <Stack as="main" className="FormConstructor">
        <TreePanel
          schema={currentCompSchema}
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
            schema={currentCompSchema}
            schemas={schemas}
            selectedCompIds={selectedCompIds}
          />
        </div>
        <CompPanel
          previewSchema={currentCompSchema}
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
