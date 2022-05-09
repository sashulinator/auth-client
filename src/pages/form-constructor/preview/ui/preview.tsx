import './preview.css'

import { schemasState } from '../../comp-panel/model/comp-schema'
import { highlightSelection, removeAllSelectionHighlights } from '../lib/highlight'
import React, { useEffect, useLayoutEffect } from 'react'
import { Form } from 'react-final-form'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { selectedCompIdsState } from '@/entities/schema'
import { currentSchemaHistoryState } from '@/entities/schema/model/current-schema'
import CompDrawer, { Context } from '@/shared/draw-comps'

interface PreviewProps {
  context: Context
}

export default function Preview(props: PreviewProps): JSX.Element {
  const [currentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const [schemas] = useRecoilState(schemasState)
  const resetFSchema = useResetRecoilState(currentSchemaHistoryState)
  const [selectedCompIds] = useRecoilState(selectedCompIdsState)
  const resetPickedFCompId = useResetRecoilState(selectedCompIdsState)

  useLayoutEffect(() => {
    removeAllSelectionHighlights()

    selectedCompIds.forEach((compId) => {
      highlightSelection(compId)
    })
  }, [selectedCompIds, currentSchemaHistory.data])

  useEffect(() => {
    resetFSchema()
    resetPickedFCompId()
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <div className="selectorArea" />
      <div className="hoverArea" />
      {schemas && (
        <Form
          key={JSON.stringify(currentSchemaHistory)}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                {currentSchemaHistory && (
                  <CompDrawer
                    schemas={schemas}
                    comps={currentSchemaHistory.data.comps}
                    bindingContext={{
                      states: {
                        ...props.context.states,
                        formState: formProps.form.getState(),
                      },
                      functions: {
                        ...props.context.functions,
                      },
                    }}
                  />
                )}
              </form>
            )
          }}
        />
      )}
    </div>
  )
}
