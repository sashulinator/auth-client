import { CSchemasState, lackOfCSchemaIdsState, pickedCSchemaState } from '../model/comp-schema'
import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import React, { FC, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { useGetSchemaDependency } from '@/api/schema'
import { Comp } from '@/common/types'
import { replace } from '@/lib/change-unmutable'
import {
  FSchemaHistoryState,
  pickedFCompState,
  setFSchemaComps,
} from '@/pages/form-constructor/preview/model/form-schema'

const CompPanel: FC = (): JSX.Element | null => {
  const [CSchemas, setCSchemas] = useRecoilState(CSchemasState)
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const lackOfCSchemaIds = useRecoilValue(lackOfCSchemaIdsState)
  const resetCSchemas = useResetRecoilState(CSchemasState)

  const { data, isLoading } = useGetSchemaDependency(lackOfCSchemaIds)

  useEffect(() => resetCSchemas, [])
  useEffect(setFetchedSchemasToState, [data])

  function setFetchedSchemasToState() {
    if (data !== undefined) {
      setCSchemas({ ...data, ...CSchemas })
    }
  }

  function onAutosave(comp: Comp) {
    const newComps = replace(FSchemaHistory.data.comps, comp.id, comp)
    setFSchemaHistory(setFSchemaComps(newComps))
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
          FSchemaHistory,
          setFSchemaHistory,
          CSchemas,
        }}
        onAutosave={onAutosave}
      />
      {!isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}

export default CompPanel
