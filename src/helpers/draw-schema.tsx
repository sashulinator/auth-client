import { isString } from '@savchenko91/schema-validator'

import React, { FC, memo } from 'react'
import { Field } from 'react-final-form'
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

  return <SchemaItemComponent key={schemaItem.path} schemaItem={schemaItem} />
}

export const SchemaItemComponent: FC<{ schemaItem: SchemaItem }> = (props) => {
  const [formSchema] = useRecoilState(formSchemaState)
  const schemaItem = formSchema[props.schemaItem.id]

  if (schemaItem === undefined) {
    return null
  }

  const Component = hashComponents[schemaItem?.name]

  if (schemaItem.type === 'input' || schemaItem.type === 'checkbox') {
    return <MemoFieldComponent schemaItem={schemaItem} Component={Component} />
  }

  return <MemoSimpleComponent schemaItem={schemaItem} Component={Component} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldComponent: FC<{ schemaItem: SchemaItem; Component: any }> = (props) => {
  // const form = useForm()
  const { schemaItem, Component } = props

  return (
    <Field
      type={schemaItem.type}
      name={schemaItem.path}
      key={schemaItem.path}
      defaultValue={schemaItem.defaultValue}
      {...schemaItem.props}
    >
      {({ input, meta }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function onChange(event: any) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const test = schemaItem as any

          if (test?.bindings?.event?.includes?.('onChange')) {
            // const formItem = formSchema[test.bindings.componentIds[0]]
            // form.change(formItem?.path || '', value)
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
const MemoFieldComponent = memo(FieldComponent)

export const SimpleComponent: FC<{ schemaItem: SchemaItem; Component: any }> = (props) => {
  console.log('renderssss')

  const { schemaItem, Component } = props

  return <Component {...schemaItem.props}>{schemaItem.children?.map(drawSchema)}</Component>
}
const MemoSimpleComponent = memo(SimpleComponent)
