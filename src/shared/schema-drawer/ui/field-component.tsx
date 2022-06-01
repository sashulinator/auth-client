import { assertNotUndefined } from '@savchenko91/schema-validator'

import buildValidator from '../lib/build-validators'
import { componentListBlind } from '../lib/component-list'
import injectToComp from '../lib/inject-to-comp'
import isRequired from '../lib/is-required'
import { DrawerContext } from '../model/types'
import React, { memo } from 'react'
import { Field } from 'react-final-form'

import { Comp, CompSchema, Norm, Schema } from '@/entities/schema/model/types'
import FieldError from '@/shared/field-error'

export interface FieldComponentProps {
  comp: Comp
  schema: CompSchema
  schemas: Norm<Schema>
  context: DrawerContext
}

const FieldComponent = memo(function FieldComponent(props: FieldComponentProps) {
  const сomponentItem = componentListBlind[props.schema.componentName]
  assertNotUndefined(сomponentItem)

  const validate = buildValidator(props.comp.validators)

  const injectedComp = injectToComp(props.comp.injections, props.context, props.comp)

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
              {...props.context.fns}
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
