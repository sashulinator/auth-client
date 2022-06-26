import './preview.css'

import { highlightOnEvents } from '../lib/highlight-on-events'
import React, { useEffect, useRef } from 'react'
import { Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import useMoving from '@/lib/use-moving'
import LoadingAria from '@/shared/loading-aria'
import SchemaDrawer, { Catalog, CompSchema, CompSchemaType } from '@/shared/schema-drawer'

interface PreviewProps {
  schema: CompSchema
  schemas: Catalog<CompSchema> | null
  selectedCompIds: string[]
  isLoading: boolean
}

export default function Preview(props: PreviewProps): JSX.Element | null {
  const { schemas, schema } = props

  const ref = useMoving('preview', ['ms-Stack'])

  const values = useRef({})

  useEffect(() => highlightOnEvents(props.selectedCompIds), [props.selectedCompIds, props.schema])

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

  if (props.schema.type === CompSchemaType.FORM_DIMENSION) {
    return null
  }

  return (
    <div className="Preview" ref={ref}>
      <LoadingAria loading={props.isLoading} label="Components loading...">
        <div className="wrapper">
          <div className="selectorArea" />
          <div className="hoverArea" />
          {schemas && schema && (
            <Form
              onSubmit={onSubmit}
              render={(formProps) => {
                values.current = formProps.form.getState().values as Record<string, unknown>

                return (
                  <form id="main" onSubmit={formProps.handleSubmit}>
                    <SchemaDrawer
                      values={values.current}
                      componentList={componentList}
                      schema={schema}
                      schemas={schemas}
                      context={{ form: formProps.form }}
                    />
                  </form>
                )
              }}
            />
          )}
        </div>
      </LoadingAria>
    </div>
  )
}
