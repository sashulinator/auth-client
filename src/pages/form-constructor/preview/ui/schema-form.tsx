import { IContextualMenuItem, Icon, PrimaryButton, Stack } from '@fluentui/react'
import { ErrorCollection } from '@savchenko91/schema-validator'

import React, { useMemo } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import uuid from 'uuid-random'

import { createSchema, updateSchema } from '@/api/schema'
import { schemaValidator } from '@/common/schemas'
import ROUTES from '@/constants/routes'
import { FormType, Schema, currentSchemaHistoryState, schemaSetter } from '@/entities/schema'
import useAppMutation from '@/lib/use-mutation'
import Autosave from '@/shared/autosave'
import ContextualMenu from '@/shared/contextual-menu/contextual-menu'
import { Dropdown, optionsFromStringArray } from '@/shared/dropdown'
import FieldError from '@/shared/field-error'
import { componentNameOptions } from '@/shared/schema-drawer/lib/component-list'
import CustomTextField from '@/shared/textfield'
import { successMessage } from '@/shared/toast'

const typeArray = [FormType.FORM, FormType.PRESET, FormType.COMP]

type SchemaFormValues = Pick<Schema, 'title' | 'componentName' | 'type'>

export default function SchemaForm(): JSX.Element {
  const { t, i18n } = useTranslation()
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const { id } = useParams()
  const navigate = useNavigate()

  const { mutateAsync: apiCreateSchema } = useAppMutation(createSchema, {
    onSuccess: (data) => {
      navigate(ROUTES.FORM_CONSTRUCTOR.buildURL(data.id))
      successMessage(t('messages.saved'))
    },
  })

  const { mutateAsync: apiUpdateSchema } = useAppMutation(updateSchema, {
    onSuccess: () => {
      successMessage(t('messages.saved'))
    },
  })

  const options = useMemo(() => optionsFromStringArray(typeArray, t), [i18n.language])

  async function copySchema() {
    const response = await fetch('/api/v1/schemas', {
      method: 'POST',
      // TODO копируется текущий стейт а не тот что пришел с сервера
      body: JSON.stringify({
        ...currentSchemaHistory.data,
        id: uuid(),
        title: `${currentSchemaHistory.data.title}_copy`,
      }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    const data = await response.json()
    console.log('data', data)

    if (response.ok) {
      navigate(ROUTES.FORM_CONSTRUCTOR.buildURL(data.id))
    }
  }

  async function deleteSchema() {
    const response = await fetch('/api/v1/schemas', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [currentSchemaHistory.data.id] }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    if (response.ok) {
      navigate(ROUTES.SCHEMA_LIST.buildURL())
    }
  }

  const items: IContextualMenuItem[] = [
    {
      key: 'delete',
      text: 'delete',
      onClick: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        deleteSchema()
      },
    },
    {
      key: 'copy',
      text: 'copy',
      onClick: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        copySchema()
      },
    },
  ]

  async function onSubmit(submitSchemaData: SchemaFormValues): Promise<void | ErrorCollection> {
    const { title, type } = submitSchemaData

    const newComponentName = type !== FormType.COMP ? null : submitSchemaData.componentName
    const newId = id ? id : uuid()

    const newSchema: Schema = {
      ...currentSchemaHistory.data,
      id: newId,
      componentName: newComponentName,
      title,
      type,
    }

    try {
      if (id) {
        await apiUpdateSchema(newSchema)
      } else {
        await apiCreateSchema(newSchema)
      }
      // TODO возвращать ошибки валидатора только плюс потом появится бэк на джаве
      // и надо будет изменять формат этих ошибок под формат final-form
    } catch (e) {
      return e
    }
  }

  function saveLocaly(schema: SchemaFormValues) {
    setCurrentSchemaHistory(schemaSetter({ ...currentSchemaHistory.data, ...schema }))
  }

  return (
    <Form<SchemaFormValues, SchemaFormValues>
      initialValues={{
        title: currentSchemaHistory.data?.title,
        componentName: currentSchemaHistory.data?.componentName,
        type: currentSchemaHistory.data?.type,
      }}
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
            <Autosave save={saveLocaly} debounce={700} />
            <Field<string> name="title" validate={(v) => schemaValidator.title(v)}>
              {({ input, meta }) => {
                return (
                  <div className="FieldErrorPositionRelative">
                    <CustomTextField key="1" label={t(`fieldNames.title`)} underlined {...input} />
                    <FieldError key="2" meta={meta} />
                  </div>
                )
              }}
            </Field>
            <Field<string> name="type">
              {({ input }) => <Dropdown styles={{ root: { width: '150px' } }} options={options} {...input} />}
            </Field>
            {formProps.form.getFieldState('type')?.value === 'COMP' && (
              <Field<string> name="componentName">
                {({ input }) => (
                  <Dropdown styles={{ root: { width: '150px' } }} options={componentNameOptions} {...input} />
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
