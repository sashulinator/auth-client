import './comp-panel.css'

import CompForm from './comp-form'
import { Config } from 'final-form'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { Comp, Norm, Schema } from '@/entities/schema'

interface CompPanelProps {
  onSubmit: Config<Comp, Comp>['onSubmit']
  isLoading: boolean
  context: Record<string, unknown>
  schemas: Norm<Schema> | null
  schema: Schema | null
  comp: Comp | null
  ContextualMenu: (props: { comp: Comp }) => JSX.Element
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const schemaIsMissing = !props.isLoading && !props.schema

  if (!props.schemas || !props.comp) {
    return null
  }

  return (
    <PerfectScrollbar className="CompPanel">
      {schemaIsMissing && <props.ContextualMenu comp={props.comp} />}
      {props.schema && (
        <CompForm
          schema={props.schema}
          schemas={props.schemas}
          comp={props.comp}
          context={props.context}
          onSubmit={props.onSubmit}
        />
      )}
    </PerfectScrollbar>
  )
}
