import { Stack } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import './form-constructor.css'

import {
  currentSchemaHistoryState,
  setFSchemaComps,
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
import { Comp } from '@/common/types'
import ROUTES from '@/constants/routes'
import { selectedCompIdsState } from '@/entities/schema'
import { getSelectedComp } from '@/entities/schema/lib/selected-comp'
import CompContextualMenu from '@/entities/schema/ui/contextual-menu'
import { removeEntity } from '@/lib/entity-actions'
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

  function removeCompFromState(compId: string) {
    assertNotNull(currentSchemaHistory)

    const comps = removeEntity(compId, currentSchemaHistory.data.comps)
    assertNotUndefined(comps)

    setCurrentSchemaHistory(setFSchemaComps(comps))

    if (compId === selectedComp?.id) {
      setSelectedCompIds([])
    }
  }

  function openSchemaInNewTab(schemaId: string) {
    const url = ROUTES.FORM_CONSTRUCTOR.buildURL(schemaId)
    window.open(url, '_blanc')?.focus()
  }

  return (
    <>
      <KeyListener />
      <Header />
      <div className="fakeHeader" />
      <Stack as="main" className="FormConstructor">
        <TreePanel />
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
