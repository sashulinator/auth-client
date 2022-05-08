import { assertNotUndefined } from '@savchenko91/schema-validator'

import buildValidator from '../lib/build-validators'
import componentList from '../lib/component-list'
import { DrawerComponentProps } from '../types'
import React, { memo } from 'react'
import { Field } from 'react-final-form'

import FieldError from '@/shared/field-error'

const FieldComponent = memo(function FieldComponent(props: DrawerComponentProps) {
  const CSchema = props.schemas[props.comp.compSchemaId]

  if (CSchema?.componentName === null || CSchema === undefined) {
    return null
  }

  const сomponentItem = componentList[CSchema.componentName]

  assertNotUndefined(сomponentItem)

  const Component = сomponentItem.component

  const validate = buildValidator(props.comp.validators)

  return (
    <Field
      validate={(v) => {
        const error = validate?.(v)
        return { ...error }
      }}
      type={сomponentItem.type}
      name={props.comp.path}
      defaultValue={props.comp.defaultValue}
      {...props.comp.props}
    >
      {({ input, meta }) => {
        return (
          <div data-comp-id={props.comp.id} className="FieldErrorPositionRelative">
            <Component {...props.comp.props} {...input} />
            <FieldError error={meta.touched && (meta.error || meta.submitError)} />
          </div>
        )
      }}
    </Field>
  )
})

export default FieldComponent
