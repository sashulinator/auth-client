import { PrimaryButton, Stack } from '@fluentui/react'

import { drawChildren } from './preview'
import React, { FC, Fragment } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import FieldError from '@/components/field-error'
import { formSchemaState, selectedSchemaItemState } from '@/recoil/form-schema'
import { selectedPropertyState } from '@/recoil/properties'

const PropertyPanel: FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [formSchema, setFormSchema] = useRecoilState(formSchemaState)

  const selectedProperty = useRecoilValue(selectedPropertyState)
  const selectedSchemaItem = useRecoilValue(selectedSchemaItemState)
  console.log('formSchema', formSchema)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(newSchemaItemProps: any) {
    setFormSchema({ ...formSchema, children: replace(formSchema.children, 0, newSchemaItemProps) })
    // console.log({ ...formSchema, children: replace(formSchema.children, 0, formSchema as any) })
  }

  return (
    <div className="PropertyPanel">
      <Stack as="h2">{selectedProperty?.name}</Stack>
      <Form
        initialValues={selectedSchemaItem}
        onSubmit={onSubmit}
        render={(formProps) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              {selectedProperty?.children.map(drawProperty)}
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
      <Field defaultValue={item.value} type={item.type} name={item.path} key={item.path}>
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

export default PropertyPanel
