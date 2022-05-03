import { CSchemasState, lackOfCSchemaIdsState, pickedCSchemaState } from '../model/comp-schema'
import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import React, { FC, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { useGetSchemaDependency } from '@/api/schema'
import { Comp } from '@/common/types'
import { FSchemaState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import { replace } from '@/utils/change-unmutable'

const CompPanel: FC = (): JSX.Element | null => {
  const [CSchemas, setCSchemas] = useRecoilState(CSchemasState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
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

  function onSubmit(comp: Comp) {
    const newComps = replace(FSchema.comps, comp.id, comp)
    setFSchema({ ...FSchema, comps: newComps })
  }

  if (!(pickedCSchema && pickedFComp && CSchemas)) {
    return null
  }

  return (
    <PerfectScrollbar className="CompPanel">
      <CompForm schemas={CSchemas} comps={FSchema.comps} comp={pickedFComp} onSubmit={onSubmit} />
      {!isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}

export default CompPanel
