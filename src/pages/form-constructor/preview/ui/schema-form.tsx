import { IContextualMenuItem, Icon, PrimaryButton, Stack } from '@fluentui/react'
import { ErrorCollection } from '@savchenko91/schema-validator'

import { FSchemaHistoryState, setFSchema } from '../model/form-schema'
import React, { useMemo } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import uuid from 'uuid-random'

import { createSchema } from '@/api/schema'
import { schemaValidator } from '@/common/schemas'
import { FormType, Schema } from '@/common/types'
import ROUTES from '@/constants/routes'
import useAppMutation from '@/lib/use-mutation'
import ContextualMenu from '@/shared/contextual-menu/contextual-menu'
import { componentNameOptions } from '@/shared/draw-comps/lib/component-list'
import { Dropdown } from '@/shared/dropdown'
import FieldError from '@/shared/field-error'
import CustomTextField from '@/shared/textfield'
import { errorMessage, successMessage } from '@/shared/toast'

const typeArray = [FormType.FORM, FormType.PRESET, FormType.COMP]

export default function SchemaForm(): JSX.Element {
  const { t, i18n } = useTranslation()
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const { id } = useParams()
  const navigate = useNavigate()

  const { mutateAsync: apiCreateSchema } = useAppMutation(createSchema, {
    onSuccess: (data) => {
      navigate(ROUTES.FORM_CONSTRUCTOR.buildURL(data.id))
      successMessage(t('messages.saved'))
    },
  })

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

  async function onSubmit(submitFschemaData: Schema): Promise<void | ErrorCollection> {
    const { name, type } = submitFschemaData

    const newComponentName = type !== FormType.COMP ? null : submitFschemaData.componentName
    const newId = id ? id : uuid()

    const newFSchema = {
      ...FSchemaHistory.data,
      id: newId,
      componentName: newComponentName,
      name,
      type,
    }

    const errors = schemaValidator(newFSchema) as ErrorCollection

    // Маловероятный кейс, но на всякий случай
    if (errors.comps) {
      console.log(errors.comps)
      errorMessage('Unexpected error. See full information in the console')
    }

    if (errors) {
      return errors
    }

    await apiCreateSchema(newFSchema)
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
