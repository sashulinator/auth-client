import { Checkbox, PrimaryButton, Stack } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import { runAction } from './constructor-actions'
import React, { FC, memo, useEffect } from 'react'
import { Field, useForm } from 'react-final-form'

import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { FormSchemaItem } from '@/types/entities'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hashComponents: Record<string, any> = {
  Stack,
  Checkbox,
  TextField: CustomTextField,
  PrimaryButton,
}

export function drawSchema(normSchema: Record<string, FormSchemaItem>, schema?: (FormSchemaItem | string)[]) {
  return schema?.map((schemaItem) => {
    if (schemaItem === undefined) {
      return null
    }
    if (isString(schemaItem)) {
      return schemaItem
    }

    return <SchemaItemComponent key={schemaItem.path} normSchema={normSchema} schemaItem={schemaItem} />
  })
}

export const SchemaItemComponent: FC<{
  schemaItem: FormSchemaItem
  normSchema: Record<string, FormSchemaItem>
  schema?: (FormSchemaItem | string)[]
}> = (props) => {
  const schemaItem = props.normSchema[props.schemaItem.id]

  const schemaItems = schemaItem?.bindings?.reduce<FormSchemaItem[]>((acc, binding) => {
    const foundSchemaItems = binding.componentIds.map((id) => props.normSchema[id]) as FormSchemaItem[]
    return [...acc, ...foundSchemaItems]
  }, [])

  if (schemaItem === undefined) {
    return null
  }

  const Component = hashComponents[schemaItem?.name]

  if (schemaItem.type === 'input' || schemaItem.type === 'checkbox') {
    return <MemoFieldComponent schemaItem={schemaItem} schemaItems={schemaItems} Component={Component} />
  }

  return (
    <MemoSimpleComponent
      schemaItem={schemaItem}
      schemaItems={schemaItems}
      normSchema={props.normSchema}
      Component={Component}
    />
  )
}

const FieldComponent: FC<{
  schemaItem: FormSchemaItem
  schemaItems?: FormSchemaItem[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any
}> = (props) => {
  const { schemaItem, Component, schemaItems } = props
  const form = useForm()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(runAction('onInit', { form, schemaItem, schemaItems }), [])

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
            <Component {...schemaItem.props} {...input} onChange={onChange} />
            <FieldError error={meta.touched && (meta.error || meta.submitError)} />
          </>
        )
      }}
    </Field>
  )
}
const MemoFieldComponent = memo(FieldComponent)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimpleComponent: FC<{
  normSchema: Record<string, FormSchemaItem>
  schemaItem: FormSchemaItem
  schemaItems?: FormSchemaItem[]
  Component: any
  schema?: (FormSchemaItem | string)[]
}> = (props) => {
  const { schemaItem: schemaItem, Component } = props

  return <Component {...schemaItem.props}>{drawSchema(props.normSchema, schemaItem.children)}</Component>
}
const MemoSimpleComponent = memo(SimpleComponent)
