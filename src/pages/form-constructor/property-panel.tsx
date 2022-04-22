import { PrimaryButton, Stack } from '@fluentui/react'

import { drawChildren } from './preview'
import propertySchema from './property-schema.json'
import React, { FC, Fragment } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'

import FieldError from '@/components/field-error'

const PropertyPanel: FC = (): JSX.Element => {
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <div className="PropertyPanel">
      <Stack as="h2">{propertySchema.name}</Stack>
      <Form
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              {propertySchema.children.map(drawProperty)}
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

export default PropertyPanel
