import { DrawerComponentProps } from '../types'
// import { runAction } from '../../helpers/constructor-actions'
import React, { memo } from 'react'
import { Field } from 'react-final-form'

import FieldError from '@/components/field-error'

const FieldComponent = memo(function FieldComponent(props: DrawerComponentProps) {
  const Component = props.Component
  // const form = useForm()
  const CSchema = props.schemas[props.comp.compSchemaId]

  // Схема еще не прогрузилась и поэтому undefined
  if (CSchema === undefined) {
    return null
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(runAction('onInit', { form, schemaItem: comp, schemaItems: bindingNormComps }), [])

  return (
    <Field
      type={CSchema.type}
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
