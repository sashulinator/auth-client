import './preview.css'

import { highlightOnEvents } from '../lib/highlight-on-events'
import FakeHeader from './fake-header'
import clsx from 'clsx'
import React, { LegacyRef, forwardRef, useEffect, useRef } from 'react'
import { Form } from 'react-final-form'

import componentList from '@/constants/component-list'
import useMoving from '@/lib/use-moving'
import useMergedRefs from '@/lib/useMergedRefs'
import withFocus from '@/lib/with-focus'
import LoadingAria from '@/shared/loading-aria'
import SchemaDrawer, { CompSchema, CompSchemaType, CreateCompSchema, Dictionary } from '@/shared/schema-drawer'

interface PreviewProps {
  schema: CompSchema | null | CreateCompSchema
  schemas: Dictionary<CompSchema> | null
  selectedCompIds: string[]
  ref: LegacyRef<HTMLDivElement | null>
  isFocused?: boolean
  isLoading: boolean
}

const Preview = forwardRef<HTMLDivElement | null, PreviewProps>(function Preview(props, focusRef): JSX.Element | null {
  const { schemas, schema } = props

  const movingRef = useMoving('preview', ['ms-Stack'])
  const ref = useMergedRefs(movingRef, focusRef)

  const values = useRef({})

  useEffect(() => highlightOnEvents(props.selectedCompIds), [props.selectedCompIds, props.schema])

  function onSubmit(data: unknown) {
    console.log('data', data)
  }

  if (props.schema?.type === CompSchemaType.FORM_DIMENSION) {
    return null
  }

  return (
    <div className={clsx('Preview', props.isFocused && 'isFocused')} ref={ref}>
      <LoadingAria loading={props.isLoading} label="Components loading...">
        <div className="wrapper">
          <div className="selectorArea" />
          <div className="hoverArea" />
          {props.schema?.type === CompSchemaType.FORM && <FakeHeader />}
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
                      context={{ form: formProps.form, formState: formProps.form.getState() }}
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
})

export default withFocus(Preview)
