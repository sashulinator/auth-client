import CompForm from './comp-form'
import CompContextualMenu from './contextual-menu'
import { Config } from 'final-form'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { Comp } from '@/common/types'
import { Context, InitialContext } from '@/shared/draw-comps'

interface CompPanelProps {
  onSubmit: Config<Comp, Comp>['onSubmit']
  isLoading: boolean
  context: InitialContext
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const { selectedComp, selectedCompSchema, schemas } = props.context.states

  const schemaIsMissing = !props.isLoading && selectedComp && !selectedCompSchema

  if (schemas === null || !selectedComp) {
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
      {selectedCompSchema ? (
        <CompForm schema={selectedCompSchema} context={context} onSubmit={props.onSubmit} />
      ) : schemaIsMissing ? (
        <CompContextualMenu />
      ) : null}
    </PerfectScrollbar>
  )
}
