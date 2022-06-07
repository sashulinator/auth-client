import { assertNotUndefined } from '@savchenko91/schema-validator'

import { assertionList } from '../../constants/assertion-list'
import { Comp, CompSchema, ComponentContext, ComponentItem, Norm, Schema } from '../../model/types'
import bindAssertions from '../lib/bind-assertions'
import injectToComp from '../lib/inject-to-comp'
import isRequired from '../lib/is-required'
import React, { memo } from 'react'
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
