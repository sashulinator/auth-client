import { assertNotUndefined } from '@savchenko91/schema-validator'

import { assertionList } from '../constants/assertion-list'
import bindAssertions from '../lib/bind-assertions'
import bindEvents from '../lib/bind-events'
import injectToComp from '../lib/inject-to-comp'
import { interceptFieldChangeEvent } from '../lib/interceptors'
import isRequired from '../lib/is-required'
import { Comp, CompSchema, ComponentContext, ComponentItem, FieldComponentContext, Norm, Schema } from '../model/types'
import React, { memo, useEffect } from 'react'
import { Field } from 'react-final-form'

import FieldError from '@/shared/field-error'

export interface FieldComponentProps {
  comp: Comp
  schema: CompSchema
  schemas: Norm<Schema>
  context: ComponentContext
  componentList: Record<string, ComponentItem>
}

const FieldComponent = memo(function FieldComponent(props: FieldComponentProps) {
  const сomponentItem = props.componentList[props.schema.componentName]
  assertNotUndefined(сomponentItem)

  const validate = bindAssertions(assertionList, props.comp.validators)

  // TODO move to ComponentFactory
  const injectedComp = injectToComp(props.comp.injections, props.context, props.comp)

  assertNotUndefined(injectedComp.name)

  return (
    <Field
      validate={(v) => validate?.(v)}
      type={сomponentItem.type}
      name={injectedComp.name}
      defaultValue={injectedComp.defaultValue}
    >
      {({ input, meta }) => {
        const context: FieldComponentContext = {
          ...props.context,
          fns: {
            ...props.context.fns,
            onFieldChange: interceptFieldChangeEvent(props.context, injectedComp.name),
          },
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => bindEvents(context), [props.comp.bindings, props.schema])

        return (
          <div data-comp-id={injectedComp.id} className="FieldErrorPositionRelative">
            <сomponentItem.component
              {...input}
              {...injectedComp.props}
              context={props.context}
              required={isRequired(props.comp.validators)}
            />
            <FieldError meta={meta} />
          </div>
        )
      }}
    </Field>
  )
})

export default FieldComponent
