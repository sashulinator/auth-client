import './comp-panel.css'

import CompForm from './comp-form'
import { Config } from 'final-form'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import LoadingAria from '@/shared/loading-aria'
import ResizeTarget from '@/shared/resize-target'
import { Catalog, Comp, Schema } from '@/shared/schema-drawer'

interface CompPanelProps {
  onSubmit: Config<Comp, Comp>['onSubmit']
  isLoading: boolean
  context: Record<string, unknown>
  schemas: Catalog<Schema> | null
  schema: Schema | null
  comp: Comp | null
  previewSchema: Schema
  ContextualMenu: (props: { comp: Comp }) => JSX.Element
}

export default function CompPanel(props: CompPanelProps): JSX.Element | null {
  const schemaIsMissing = !props.isLoading && !props.schema

  if (!props.schemas || !props.comp) {
    return null
  }

  return (
    <div className="CompPanel">
      <ResizeTarget name="compPanelWidth" direction="right" />
      <PerfectScrollbar className="compPanelScrollable">
        <LoadingAria loading={props.isLoading}>
          {(schemaIsMissing || props.comp) && <props.ContextualMenu comp={props.comp} />}
          {props.schema && (
            <CompForm
              schema={props.schema}
              schemas={props.schemas}
              comp={props.comp}
              context={props.context}
              onSubmit={props.onSubmit}
              previewSchema={props.previewSchema}
            />
          )}
        </LoadingAria>
      </PerfectScrollbar>
    </div>
  )
}
