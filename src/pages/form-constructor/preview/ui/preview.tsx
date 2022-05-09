import './preview.css'

import { highlightSelection, removeAllSelectionHighlights } from '../lib/highlight'
import React, { useLayoutEffect } from 'react'
import { Form } from 'react-final-form'

import CompDrawer, { Context, InitialContext } from '@/shared/draw-comps'

interface PreviewProps {
  context: InitialContext
}

export default function Preview(props: PreviewProps): JSX.Element {
  const { currentSchema, schemas } = props.context.states

  useLayoutEffect(() => {
    removeAllSelectionHighlights()
    props.context.states.selectedCompIds.forEach((compId) => {
      highlightSelection(compId)
    })
  }, [props.context.states.selectedCompIds, currentSchema])

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

  if (schemas === null) {
    return <div className="Preview" />
  }

  const context: Context = {
    ...props.context,
    states: {
      ...props.context.states,
      schemas,
    },
  }

  return (
    <div className="Preview">
      <div className="selectorArea" />
      <div className="hoverArea" />
      {schemas && (
        <Form
          key={JSON.stringify(currentSchema)}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                {currentSchema && (
                  <CompDrawer
                    comps={currentSchema.comps}
                    bindingContext={{
                      states: {
                        ...context.states,
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
