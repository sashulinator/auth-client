import { IContextualMenuItem, Icon, PrimaryButton, Stack } from '@fluentui/react'

import { FSchemaState } from '../model/form-schema'
import { FormApi, SubmissionErrors } from 'final-form'
import React, { useMemo } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import uuid from 'uuid-random'

import { schemaValidator } from '@/common/schemas'
import { FormType, Schema } from '@/common/types'
import Dropdown from '@/components/dropdown/dropdown'
import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import ROUTES from '@/constants/routes'
import ContextualMenu from '@/shared/contextual-menu'
import { componentNameOptions } from '@/shared/draw-comps/lib/component-list'
import { errorMessage, successMessage } from '@/shared/toast'

const typeArray = [FormType.FORM, FormType.PRESET, FormType.COMP]

export default function SchemaForm(): JSX.Element {
  const { t } = useTranslation()
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const { id } = useParams()
  const navigate = useNavigate()

  const options = useMemo(
    () =>
      typeArray.map((typeName) => ({
        text: t(typeName.toString()),
        key: typeName,
      })),
    []
  )

  const items: IContextualMenuItem[] = [
    {
      key: 'delete',
      text: 'delete',
      onclick: async () => {
        const response = await fetch('/api/v1/schemas', {
          method: 'DELETE',
          body: JSON.stringify({ ids: [FSchema.id] }),
          headers: {
            'content-type': 'application/json',
            accept: '*/*',
          },
        })

        if (response.ok) {
          navigate(ROUTES.SCHEMA_LIST.buildURL())
        }
      },
    },
  ]

  async function onSubmit(
    submitFschemaData: Schema,
    formApi: FormApi<Schema, Schema>,
    setError?: (errors?: SubmissionErrors) => void
  ): Promise<void> {
    const { name, type, componentName = undefined } = submitFschemaData

    const newFSchema = { ...FSchema, name, type, componentName, id: id ? id : uuid() }

    const errors = schemaValidator(newFSchema)

    if (errors) {
      setError?.(errors)
      return
    }

    const response = await fetch('/api/v1/schemas', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({ ...FSchema, name, type, componentName, id: id ? id : uuid() }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    const data = (await response.json()) as Schema

    if (!response.ok) {
      errorMessage('Не удалось сделать запрос')
    } else {
      setTimeout(() => {
        successMessage('Cохранено')
      }, 10)
    }

    if (!id && data.id) {
      navigate(ROUTES.FORM_CONSTRUCTOR.buildURL(data.id))
    }
  }

  function onDropdownChange(type: FormType) {
    setFSchema({ ...FSchema, type })
  }

  //TODO обновить схему в стэйте если меняется дропдаун для componentName

  return (
    <Form<Schema, Schema>
      initialValues={FSchema}
      onSubmit={onSubmit}
      render={(formProps) => {
        return (
          <Stack
            as="form"
            className="SaveForm"
            onSubmit={formProps.handleSubmit}
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            tokens={{ childrenGap: 20, padding: '15px 40px' }}
          >
            <Field<string> name="name">
              {({ input, meta }) => {
                return (
                  <div className="FieldErrorPositionRelative">
                    <CustomTextField key="1" label={t(`fieldNames.name`)} underlined {...input} />
                    <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />
                  </div>
                )
              }}
            </Field>
            <Field<string> name="type">
              {({ input }) => (
                <Dropdown
                  styles={{ root: { width: '150px' } }}
                  options={options}
                  key="1"
                  {...input}
                  onChange={(v) => {
                    onDropdownChange(v)
                    input.onChange(v)
                  }}
                />
              )}
            </Field>
            {formProps.form.getFieldState('type')?.value === 'COMP' && (
              <Field<string> name="componentName">
                {({ input }) => (
                  <Dropdown styles={{ root: { width: '150px' } }} options={componentNameOptions} key="1" {...input} />
                )}
              </Field>
            )}
            <PrimaryButton type="submit">{id ? 'Save' : 'Create'}</PrimaryButton>
            <ContextualMenu items={items}>
              <Icon iconName="More" />
            </ContextualMenu>
          </Stack>
        )
      }}
    />
  )
}
