import { assertNotUndefined } from '@savchenko91/schema-validator'

import componentList from '../lib/component-list'
import { DrawerComponentProps } from '../types'
// import { runAction } from '../../helpers/constructor-actions'
import React, { memo } from 'react'
import { Field } from 'react-final-form'

import FieldError from '@/components/field-error'

const FieldComponent = memo(function FieldComponent(props: DrawerComponentProps) {
  // const form = useForm()
  const CSchema = props.schemas[props.comp.compSchemaId]

  if (CSchema?.componentName === null || CSchema === undefined) {
    return null
  }

  const сomponentItem = componentList[CSchema.componentName]

  assertNotUndefined(сomponentItem)

  const Component = сomponentItem.component

  return (
    <Field
      type={сomponentItem.type}
      name={props.comp.path}
      key={props.comp.path}
      defaultValue={props.comp.defaultValue}
      {...props.comp.props}
    >
      {({ input, meta }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function onChange(event: any) {
          // runAction('onChange', { form, schemaItem: comp, schemaItems: bindingNormComps })()
          input?.onChange(event)
        }

        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // function onBlur(...args: any[]) {
        //   runAction('onBlur', { form, schemaItem: comp, schemaItems: bindingNormComps })()
        //   input?.onBlur(...args)
        // }

        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // function onFocus(...args: any[]) {
        //   runAction('onFocus', { form, schemaItem: comp, schemaItems: bindingNormComps })()
        //   input?.onFocus(...args)
        // }

        return (
          <>
            <Component
              {...props.comp.props}
              {...input}
              onChange={onChange}
              // onBlur={onBlur} onFocus={onFocus}
            />
            <FieldError error={meta.touched && (meta.error || meta.submitError)} />
          </>
        )
      }}
    </Field>
  )
})

export default FieldComponent
