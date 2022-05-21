import './preview.css'

import { highlightSelection, removeAllSelectionHighlights } from '../lib/highlight'
import React, { useEffect } from 'react'
import { Form } from 'react-final-form'

import { Norm, Schema } from '@/entities/schema'
import SchemaDrawer from '@/shared/schema-drawer'

interface PreviewProps {
  schema: Schema
  schemas: Norm<Schema> | null
  selectedCompIds: string[]
}

export default function Preview(props: PreviewProps): JSX.Element {
  const { schemas, schema } = props

  useEffect(() => {
    function updateHighlights() {
      setTimeout(() => {
        removeAllSelectionHighlights()
        props.selectedCompIds.forEach((compId) => {
          highlightSelection(compId)
        })
      })
    }

    document.addEventListener('click', updateHighlights)

    return () => {
      document.removeEventListener('click', updateHighlights)
    }
  }, [props.selectedCompIds, props.schema])

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

  return (
    <div className="Preview">
      <div className="selectorArea" />
      <div className="hoverArea" />
      {schemas && schema && (
        <Form
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <SchemaDrawer
                  schema={schema}
                  schemas={schemas}
                  context={{
                    formState: formProps.form.getState(),
                    formProps,
                  }}
                />
              </form>
            )
          }}
        />
      )}
    </div>
  )
}
