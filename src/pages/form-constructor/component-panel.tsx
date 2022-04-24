import { PrimaryButton, Stack } from '@fluentui/react'

import React, { FC } from 'react'
import { Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { drawSchema } from '@/helpers/draw-schema'
import { normalizeToHashSchema } from '@/helpers/normalize'
import { selectedComponentSchemaState } from '@/recoil/component-schema'
import { formSchemaState, selectedSchemaItemState } from '@/recoil/form-schema'

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
    <div className="ComponentPanel">
      {selectedComponentSchema && (
        <Form
          key={JSON.stringify(selectedSchemaItem)}
          initialValues={selectedSchemaItem}
          onSubmit={onSubmit}
          render={(formProps) => {
            const normSchema = normalizeToHashSchema(selectedComponentSchema.schema)
            return (
              <form onSubmit={formProps.handleSubmit}>
                <Stack tokens={{ padding: '20px 20px' }}>
                  <Stack as="h2">{selectedComponentSchema?.name}</Stack>
                </Stack>
                <Stack tokens={{ padding: '20px 20px' }}>
                  {drawSchema(normSchema, selectedComponentSchema?.schema)}
                </Stack>
                {/* <Field name={'componentIds[0]'}>
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
                  </Field> */}
                <Stack tokens={{ padding: '20px 20px' }}>
                  <PrimaryButton type="submit">{t('buttons.save')}</PrimaryButton>
                </Stack>
              </form>
            )
          }}
        />
      )}
    </div>
  )
}

export default ComponentPropsPanel
