import './comp-panel.css'

import CompForm from './comp-form'
import { Config } from 'final-form'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { Comp } from '@/common/types'
import { Context, InitialContext } from '@/shared/draw-comps'

interface CompPanelProps {
  onSubmit: Config<Comp, Comp>['onSubmit']
  isLoading: boolean
  context: InitialContext
  ContextualMenu: (props: { comp: Comp }) => JSX.Element
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const { ContextualMenu } = props

  const { selectedComp, selectedCompSchema, schemas } = props.context.states

  const schemaIsMissing = !props.isLoading && selectedComp && !selectedCompSchema

  if (!schemas || !selectedComp) {
    return null
  }

  const context: Context = {
    ...props.context,
    states: {
      ...props.context.states,
      schemas,
    },
  }

  return (
    <PerfectScrollbar className="CompPanel">
      {schemaIsMissing || (selectedComp && <ContextualMenu comp={selectedComp} />)}
      {selectedCompSchema && <CompForm schema={selectedCompSchema} context={context} onSubmit={props.onSubmit} />}
    </PerfectScrollbar>
  )
}
