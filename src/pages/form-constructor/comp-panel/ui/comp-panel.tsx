import { pickedCSchemaState } from '../model/comp-schema'
import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilValue } from 'recoil'

import { pickedFCompState } from '@/entities/schema'
import { AutosavePropsHOC } from '@/shared/autosave/ui/autosave'
import { Context } from '@/shared/draw-comps'

interface CompPanelProps {
  onSubmit: AutosavePropsHOC['save']
  isLoading: boolean
  context: Context
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)

  if (!(pickedCSchema && pickedFComp)) {
    return null
  }

  return (
    <PerfectScrollbar className="CompPanel">
      <CompForm comps={pickedCSchema.comps} comp={pickedFComp} context={props.context} onSubmit={props.onSubmit} />
      {!props.isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}
