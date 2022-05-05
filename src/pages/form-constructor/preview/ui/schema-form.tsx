import { IContextualMenuItem, Icon, PrimaryButton, Stack } from '@fluentui/react'

import { FSchemaHistoryState, setFSchema } from '../model/form-schema'
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
import ContextualMenu from '@/shared/contextual-menu/contextual-menu'
import { componentNameOptions } from '@/shared/draw-comps/lib/component-list'
import { errorMessage, successMessage } from '@/shared/toast'

const typeArray = [FormType.FORM, FormType.PRESET, FormType.COMP]

export default function SchemaForm(): JSX.Element {
  const { t, i18n } = useTranslation()
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const { id } = useParams()
  const navigate = useNavigate()

  const options = useMemo(
    () =>
      typeArray.map((typeName) => ({
        text: t(typeName.toString()),
        key: typeName,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  )

  const items: IContextualMenuItem[] = [
    {
      key: 'delete',
      text: 'delete',
      onclick: async () => {
        const response = await fetch('/api/v1/schemas', {
          method: 'DELETE',
          body: JSON.stringify({ ids: [FSchemaHistory.data.id] }),
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
    const { name, type, componentName = null } = submitFschemaData

    const newFSchema = {
      ...FSchemaHistory.data,
      name,
      type,
      componentName: type !== FormType.COMP ? null : componentName,
      id: id ? id : uuid(),
    }

    const errors = schemaValidator(newFSchema)

    if (errors) {
      setError?.(errors)
      return
    }

    const response = await fetch('/api/v1/schemas', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(newFSchema),
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
    setFSchemaHistory(setFSchema({ ...FSchemaHistory.data, type }))
  }

  //TODO обновить схему в стэйте если меняется дропдаун для componentName

  return (
    <Form<Schema, Schema>
      initialValues={FSchemaHistory.data}
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
            <Field<string> name="name" validate={(v) => schemaValidator.name(v)}>
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
            <PrimaryButton type="submit">
              {id ? t('buttons.save').toString() : t('buttons.create').toString()}
            </PrimaryButton>
            <ContextualMenu items={items}>
              <Icon iconName="More" />
            </ContextualMenu>
          </Stack>
        )
      }}
    />
  )
}
