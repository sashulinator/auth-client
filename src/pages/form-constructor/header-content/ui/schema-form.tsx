import { Stack } from '@fluentui/react'
import { ErrorCollection, assertNotNull } from '@savchenko91/schema-validator'

import React, { useMemo } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import uuid from 'uuid-random'

import { createCompSchema, updateCompSchema } from '@/api/comp-schema'
import { schemaValidator } from '@/common/schemas'
import { componentNameOptions } from '@/constants/component-list'
import ROUTES from '@/constants/routes'
import useAppMutation from '@/lib/use-mutation'
import Autosave from '@/shared/autosave'
import { Button } from '@/shared/button'
import { Dropdown } from '@/shared/dropdown'
import EditableText from '@/shared/editable-text'
import FieldError from '@/shared/field-error'
import { CompSchema, CompSchemaType, CreateCompSchema } from '@/shared/schema-drawer'
import { successMessage } from '@/shared/toast'

type SchemaFormValues = Pick<CompSchema, 'title' | 'componentName' | 'type'>

interface SchemaFormProps {
  compSchema: CreateCompSchema | CompSchema | null
  setCompSchema: (compSchema: CreateCompSchema | CompSchema) => void
}

export default function SchemaForm(props: SchemaFormProps): JSX.Element | null {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const { mutateAsync: apiCreateSchema } = useAppMutation(createCompSchema, {
    onSuccess: (data) => {
      navigate(ROUTES.FORM_CONSTRUCTOR_EDIT.PATH.replace(':id', data.id))
      successMessage(t('messages.saved'))
    },
  })

  const { mutateAsync: apiUpdateSchema } = useAppMutation(updateCompSchema, {
    onSuccess: () => {
      successMessage(t('messages.saved'))
    },
  })

  const options = useMemo(
    () =>
      Object.values(CompSchemaType).map((schemaType) => ({
        key: schemaType,
        text: t(`t.schemaTypes.${schemaType}`),
      })),
    [i18n.language]
  )

  async function onSubmit(submitSchemaData: SchemaFormValues): Promise<void | ErrorCollection> {
    const { title, type } = submitSchemaData
    assertNotNull(props.compSchema)
    const newComponentName = type !== CompSchemaType.COMP ? null : submitSchemaData.componentName
    const newId = id ? id : uuid()

    const newSchema: CompSchema = {
      ...props.compSchema,
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
    assertNotNull(props.compSchema)
    props.setCompSchema({ ...props.compSchema, ...schema })
  }

  if (props.compSchema === null) {
    return null
  }

  return (
    <Form<SchemaFormValues, SchemaFormValues>
      initialValues={{
        title: props.compSchema.title,
        componentName: props.compSchema.componentName,
        type: props.compSchema.type,
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
            tokens={{ childrenGap: 16, padding: '16px 0 16px' }}
          >
            <Autosave onSubmit={saveLocaly} debounce={700} />
            <Field<string> name="title" validate={(v) => schemaValidator.title(v)}>
              {({ input, meta }) => {
                return (
                  <div className="FieldErrorPositionRelative">
                    <EditableText key="1" {...input} />
                    <FieldError key="2" meta={meta} />
                  </div>
                )
              }}
            </Field>
            <Field<string> name="type">
              {({ input }) => <Dropdown styles={{ root: { width: '250px' } }} options={options} {...input} />}
            </Field>
            {formProps.form.getFieldState('type')?.value === 'COMP' && (
              <Field<string> name="componentName">
                {({ input }) => (
                  <Dropdown styles={{ root: { width: '250px' } }} options={componentNameOptions} {...input} />
                )}
              </Field>
            )}
            <Button type="submit" text={id ? 't.buttons.save' : 't.buttons.create'} />
          </Stack>
        )
      }}
    />
  )
}
