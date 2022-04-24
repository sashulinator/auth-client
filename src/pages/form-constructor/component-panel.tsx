import { PrimaryButton, Stack } from '@fluentui/react'

import arrayMutators from 'final-form-arrays'
import React, { FC } from 'react'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import DropdownMultipleSelect from '@/components/dropdown/dropdown-multiple-select'
import { drawSchema } from '@/helpers/draw-schema'
import { normalizeToHashSchema } from '@/helpers/normalize'
import { selectedComponentSchemaState } from '@/recoil/component-schema'
import { formSchemaState, selectedSchemaItemState } from '@/recoil/form-schema'
import { ComponentSchema } from '@/types/entities'

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
          mutators={{
            // potentially other mutators could be merged here
            ...arrayMutators,
          }}
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
                <hr />
                <Stack tokens={{ padding: '20px 20px' }}>
                  <BindingsSection componentSchema={selectedComponentSchema} />
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

function BindingsSection(props: { componentSchema: ComponentSchema }) {
  const { t } = useTranslation()
  const [formSchema] = useRecoilState(formSchemaState)

  console.log('formSchema', formSchema)

  const eventOptions =
    props?.componentSchema?.events?.map((opt) => ({
      key: opt,
      text: opt,
    })) || []

  const actionsOptions =
    props?.componentSchema?.actions?.map((opt) => ({
      key: opt,
      text: opt,
    })) || []

  const componentsIdsOptions =
    Object.values(formSchema)?.map((schema) => ({
      key: schema.id,
      text: schema.name,
    })) || []

  return (
    <FieldArray name="bindings">
      {({ fields }) => (
        <div>
          <PrimaryButton onClick={() => fields.push({ events: [], actions: [], componentIds: [] })}>
            {t('formConstructorPage.addBindings')}
          </PrimaryButton>
          {fields.map((name, index) => (
            <div key={name}>
              <Field name={`${name}.events`}>
                {({ input }) => [
                  <DropdownMultipleSelect
                    selectedKeys={input.value}
                    key="1"
                    placeholder="events"
                    options={eventOptions}
                    {...input}
                  />,
                ]}
              </Field>
              <Field name={`${name}.actions`}>
                {({ input }) => [
                  <DropdownMultipleSelect
                    selectedKeys={input.value}
                    key="1"
                    placeholder="actions"
                    options={actionsOptions}
                    {...input}
                  />,
                ]}
              </Field>
              <Field name={`${name}.componentIds`}>
                {({ input }) => [
                  <DropdownMultipleSelect
                    selectedKeys={input.value}
                    key="1"
                    placeholder="components"
                    options={componentsIdsOptions}
                    {...input}
                  />,
                ]}
              </Field>
              <PrimaryButton
                onClick={() => {
                  fields.remove(index)
                }}
              >
                {t('buttons.remove')}
              </PrimaryButton>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  )
}

export default ComponentPropsPanel
