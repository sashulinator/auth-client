import { CSchemasState, lackOfCSchemaIdsState, pickedCSchemaState } from '../model/comp-schema'
import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import React, { useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useGetSchemaDependency } from '@/api/schema'
import { pickedFCompState } from '@/entities/schema'
import { currentSchemaHistoryState } from '@/entities/schema/model/current-schema'
import { AutosavePropsHOC } from '@/shared/autosave/ui/autosave'

interface CompPanelProps {
  onSubmit: AutosavePropsHOC['save']
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const [CSchemas, setCSchemas] = useRecoilState(CSchemasState)
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const lackOfCSchemaIds = useRecoilValue(lackOfCSchemaIdsState)

  const { data, isLoading } = useGetSchemaDependency(lackOfCSchemaIds)

  useEffect(setFetchedSchemasToState, [data])

  function setFetchedSchemasToState() {
    if (data !== undefined) {
      setCSchemas({ ...data, ...CSchemas })
    }
  }

  if (!(pickedCSchema && pickedFComp && CSchemas)) {
    return null
  }

  return (
    <PerfectScrollbar className="CompPanel">
      <CompForm
        schemas={CSchemas}
        comps={pickedCSchema.comps}
        comp={pickedFComp}
        context={{
          currentSchemaHistory,
          setCurrentSchemaHistory,
          CSchemas,
        }}
        onSubmit={props.onSubmit}
      />
      {!isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}
