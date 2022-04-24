import { isString } from '@savchenko91/schema-validator'

import React, { FC } from 'react'
import { Field, useForm } from 'react-final-form'
import { useRecoilState } from 'recoil'

import FieldError from '@/components/field-error'
import { hashComponents } from '@/pages/form-constructor/preview'
import { formSchemaState } from '@/recoil/form-schema'
import { SchemaItem } from '@/types/entities'

export function drawSchema(schemaItem?: SchemaItem | string) {
  if (schemaItem === undefined) {
    return null
  }
  if (isString(schemaItem)) {
    return schemaItem
  }

  return <SchemaItemComponent schemaItem={schemaItem} />
}

export const SchemaItemComponent: FC<{ schemaItem: SchemaItem }> = (props) => {
  // TODO попробовать наисать селектор и выбирать из него
  const form = useForm()
  const [formSchema] = useRecoilState(formSchemaState)
  const Component = hashComponents[props.schemaItem?.name]

  if (props.schemaItem.type === 'input' || props.schemaItem.type === 'checkbox') {
    return (
      <Field
        type={props.schemaItem.type}
        name={props.schemaItem.path}
        key={props.schemaItem.path}
        defaultValue={props.schemaItem.defaultValue}
        {...props.schemaItem.props}
      >
        {({ input, meta }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          function onChange(event: any, value: any) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const test = props.schemaItem as any

            if (test?.bindings?.event?.includes?.('onChange')) {
              const formItem = formSchema[test.bindings.componentIds[0]]
              form.change(formItem?.path || '', value)
            }
            input?.onChange(event)
          }

          return (
            <>
              <Component {...input} onChange={onChange} />
              <FieldError error={meta.touched && (meta.error || meta.submitError)} />
            </>
          )
        }}
      </Field>
    )
  }

  return <Component {...props.schemaItem.props}>{props.schemaItem.children?.map(drawSchema)}</Component>
}
