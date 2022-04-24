import { isString } from '@savchenko91/schema-validator'

import { hashActions } from './constructor-actions'
import React, { FC, memo, useEffect } from 'react'
import { Field, useForm } from 'react-final-form'
import { useRecoilState } from 'recoil'

import FieldError from '@/components/field-error'
import { hashComponents } from '@/pages/form-constructor/preview'
import { formSchemaState } from '@/recoil/form-schema'
import { FormSchemaItem, NormSchemaItem } from '@/types/entities'

export function drawSchema(schemaItem?: FormSchemaItem | string) {
  if (schemaItem === undefined) {
    return null
  }
  if (isString(schemaItem)) {
    return schemaItem
  }

  return <SchemaItemComponent key={schemaItem.path} schemaItem={schemaItem} />
}

export const SchemaItemComponent: FC<{ schemaItem: FormSchemaItem }> = (props) => {
  const [formSchema] = useRecoilState(formSchemaState)
  const schemaItem = formSchema[props.schemaItem.id]

  const schemaItems = schemaItem?.bindings?.reduce<NormSchemaItem[]>((acc, binding) => {
    const foundSchemaItems = binding.componentIds.map((id) => formSchema[id]) as NormSchemaItem[]
    return [...acc, ...foundSchemaItems]
  }, [])

  if (schemaItem === undefined) {
    return null
  }

  const Component = hashComponents[schemaItem?.name]

  if (schemaItem.type === 'input' || schemaItem.type === 'checkbox') {
    return <MemoFieldComponent schemaItem={schemaItem} schemaItems={schemaItems} Component={Component} />
  }

  return <MemoSimpleComponent schemaItem={schemaItem} schemaItems={schemaItems} Component={Component} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldComponent: FC<{ schemaItem: NormSchemaItem; schemaItems?: NormSchemaItem[]; Component: any }> = (props) => {
  const { schemaItem, Component, schemaItems } = props
  const form = useForm()
  const value = form.getFieldState(schemaItem.path)?.value

  useEffect(() => {
    schemaItem.bindings?.forEach((binding) => {
      if (binding.events.includes('onInit')) {
        // TODO schemaItems сейчас для всех байндингов, сделать для каждого отдельно
        binding.actions.reduce((newValue, action) => {
          return hashActions[action]?.({ schemaItem, schemaItems, form, value: newValue })
        }, value)
      }
    })
  }, [])

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

export const SimpleComponent: FC<{ schemaItem: NormSchemaItem; schemaItems?: NormSchemaItem[]; Component: any }> = (
  props
) => {
  const { schemaItem: schemaItem, Component } = props

  return <Component {...schemaItem.props}>{schemaItem.children?.map(drawSchema)}</Component>
}
const MemoSimpleComponent = memo(SimpleComponent)
