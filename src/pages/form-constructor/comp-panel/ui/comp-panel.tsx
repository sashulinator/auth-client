import { pickedCSchemaState, schemasState } from '../model/comp-schema'
import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useRecoilValue } from 'recoil'

import { pickedFCompState } from '@/entities/schema'
import { currentSchemaHistoryState } from '@/entities/schema/model/current-schema'
import { AutosavePropsHOC } from '@/shared/autosave/ui/autosave'

interface CompPanelProps {
  onSubmit: AutosavePropsHOC['save']
  isLoading: boolean
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const [schemas] = useRecoilState(schemasState)
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)

  if (!(pickedCSchema && pickedFComp && schemas)) {
    return null
  }

  return (
    <PerfectScrollbar className="CompPanel">
      <CompForm
        schemas={schemas}
        comps={pickedCSchema.comps}
        comp={pickedFComp}
        context={{
          currentSchemaHistory,
          setCurrentSchemaHistory,
          CSchemas: schemas,
        }}
        onSubmit={props.onSubmit}
      />
      {!props.isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}
