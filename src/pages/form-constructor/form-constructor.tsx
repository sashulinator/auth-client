import { Stack } from '@fluentui/react'

import './form-constructor.css'

import { currentSchemaHistoryState, upsertCurrentSchemaComp } from '../../entities/schema/model/current-schema'
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
import { selectedCompIdsState } from '@/entities/schema'
import { getSelectedComp } from '@/entities/schema/lib/selected-comp'
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

  const selectedComp = getSelectedComp(currentSchemaHistory.data, selectedCompIds)
  const context: InitialContext = {
    states: {
      schemas,
      currentSchema: currentSchemaHistory.data,
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

  useEffect(() => resetCSchemas, [])
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

  return (
    <>
      <KeyListener />
      <Header />
      <div className="fakeHeader" />
      <Stack as="main" className="FormConstructor">
        <TreePanel />
        <Preview context={context} />
        <CompPanel onSubmit={upsertCompToCurrentSchemaState} isLoading={isDependencySchemasLoading} context={context} />
        <PaletteModal />
      </Stack>
    </>
  )
}

export default FormConstructor
