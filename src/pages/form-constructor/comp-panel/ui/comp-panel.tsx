import { CSchemasState, lackOfCSchemaIdsState, pickedCSchemaState } from '../model/comp-schema'
import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import React, { FC, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useGetSchemaDependency } from '@/api/schema'
import { Comp } from '@/common/types'
import { pickedFCompState } from '@/entities/schema'
import { currentSchemaHistoryState, setFSchemaComps } from '@/entities/schema/model/current-schema'
import { replace } from '@/lib/change-unmutable'

const CompPanel: FC = (): JSX.Element | null => {
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

  function onAutosave(comp: Comp) {
    const newComps = replace(currentSchemaHistory.data.comps, comp.id, comp)
    setCurrentSchemaHistory(setFSchemaComps(newComps))
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
        onAutosave={onAutosave}
      />
      {!isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}

export default CompPanel
