import { Dropdown, PrimaryButton, Stack } from '@fluentui/react'
import { isString } from '@savchenko91/schema-validator'

import { hashComponents } from './preview'
import React, { FC, Fragment } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import FieldError from '@/components/field-error'
import { selectedComponentSchemaState } from '@/recoil/component-schema'
import { formSchemaState, selectedSchemaItemState } from '@/recoil/form-schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const drawChildren = (item?: any, i?: number) => {
  if (item === undefined) {
    return null
  }
  if (isString(item)) {
    return item
  }
  const Comp = hashComponents[item?.name]
  let drawedChildren
  if (item.children) {
    drawedChildren = item.children.map(drawChildren)
  }

  return (
    <Comp key={item?.path || i} {...item?.props}>
      {drawedChildren}
    </Comp>
  )
}

const ComponentPropsPanel: FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [formSchema, setFormSchema] = useRecoilState(formSchemaState)

  const selectedComponentSchema = useRecoilValue(selectedComponentSchemaState)
  const selectedSchemaItem = useRecoilValue(selectedSchemaItemState)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(newSchemaItemProps: any) {
    const newSchema = { ...formSchema, [newSchemaItemProps.id]: newSchemaItemProps }
    setFormSchema(newSchema)
    console.log('newSchema', newSchemaItemProps)
  }

  return (
    <div className="PropertyPanel">
      <Stack as="h2">{selectedComponentSchema?.name}</Stack>
      <div>prop: {selectedComponentSchema?.id}</div>
      <div>item id {selectedSchemaItem?.id}</div>
      <Form
        key={JSON.stringify(selectedSchemaItem)}
        initialValues={selectedSchemaItem}
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              {selectedComponentSchema?.schema?.map(drawProperty)}
              <Field name={'event'}>
                {({ input, meta }) => [
                  <Dropdown
                    key="1"
                    placeholder="events"
                    options={
                      selectedComponentSchema?.events?.map((opt) => ({
                        key: opt,
                        text: opt,
                      })) || []
                    }
                    {...input}
                    onChange={(e, selected) => {
                      input.onChange(selected?.key)
                    }}
                  />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field name={'actions'}>
                {({ input, meta }) => [
                  <Dropdown
                    key="1"
                    placeholder="actions"
                    options={
                      selectedComponentSchema?.actions?.map((opt) => ({
                        key: opt,
                        text: opt,
                      })) || []
                    }
                    {...input}
                    onChange={(e, selected) => {
                      input.onChange(selected?.key)
                    }}
                  />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Field name={'componentIds[0]'}>
                {({ input, meta }) => [
                  <Dropdown
                    key="1"
                    placeholder="form item"
                    options={
                      Object.keys(formSchema).map((opt) => ({
                        key: opt,
                        text: opt,
                      })) || []
                    }
                    {...input}
                    onChange={(e, selected) => {
                      input.onChange(selected?.key)
                    }}
                  />,
                  <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                ]}
              </Field>
              <Stack tokens={{ padding: '40px 0' }}>
                <PrimaryButton type="submit">{t('buttons.save')}</PrimaryButton>
              </Stack>
            </form>
          )
        }}
      />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawProperty(item: any) {
  if (item.type === 'input' || item.type === 'checkbox') {
    return (
      <Field type={item.type} name={item.path} key={item.path}>
        {({ input, meta }) => [
          <Fragment key="1">{drawChildren({ ...item, props: { ...item?.props, ...input } })}</Fragment>,
          <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
        ]}
      </Field>
    )
  }

  return drawChildren({ ...item, props: { ...item?.props } })
}

export function replace<T>(array: T[], index: number, ...items: T[]): T[] {
  return [...array.slice(0, index), ...items, ...array.slice(index + 1)]
}

export default ComponentPropsPanel
