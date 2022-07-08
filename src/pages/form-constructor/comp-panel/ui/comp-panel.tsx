import './comp-panel.css'

import CompForm from './comp-form'
import DimensionCompForm from './dimension-comp-form'
import clsx from 'clsx'
import { Config } from 'final-form'
import React, { LegacyRef, forwardRef } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import withFocus from '@/lib/with-focus'
import LoadingAria from '@/shared/loading-aria'
import ResizeTarget from '@/shared/resize-target'
import { Comp, CompSchema, CreateCompSchema, Dictionary, LinkedComp, isLinkedComp } from '@/shared/schema-drawer'

interface CompPanelProps {
  onSubmit: Config<Comp, Comp>['onSubmit']
  isLoading: boolean
  context: Record<string, unknown>
  schemas: Dictionary<CompSchema> | null
  schema: CompSchema | null
  comp: Comp | LinkedComp | null
  previewSchema: CompSchema | null | CreateCompSchema
  ContextualMenu: (props: { comp: Comp | LinkedComp }) => JSX.Element
  ref: LegacyRef<HTMLDivElement | null>
  isFocused?: boolean
}

const CompPanel = forwardRef<HTMLDivElement | null, CompPanelProps>(function CompPanel(props, ref): JSX.Element | null {
  const schemaIsMissing = !props.isLoading && !props.schema

  return (
    <div className={clsx(props.isFocused && 'isFocused')} ref={ref} style={{ overflow: 'visible' }}>
      {props.schemas && props.comp && props.previewSchema && (
        <div className={clsx('CompPanel')}>
          <ResizeTarget name="compPanelWidth" direction="right" />
          <PerfectScrollbar className="compPanelScrollable">
            <LoadingAria loading={props.isLoading}>
              {(schemaIsMissing || props.comp) && <props.ContextualMenu comp={props.comp} />}
              {props.schema &&
                (isLinkedComp(props.comp) ? (
                  <DimensionCompForm
                    schema={props.schema}
                    schemas={props.schemas}
                    comp={props.comp}
                    context={props.context}
                    onSubmit={props.onSubmit}
                    previewSchema={props.previewSchema}
                  />
                ) : (
                  <CompForm
                    schema={props.schema}
                    schemas={props.schemas}
                    comp={props.comp}
                    context={props.context}
                    onSubmit={props.onSubmit}
                    previewSchema={props.previewSchema}
                  />
                ))}
            </LoadingAria>
          </PerfectScrollbar>
        </div>
      )}
    </div>
  )
})

export default withFocus(CompPanel)
