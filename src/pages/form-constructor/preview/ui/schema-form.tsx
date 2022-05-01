import { IDropdownOption, PrimaryButton, Stack } from '@fluentui/react'

import { FSchemaState } from '../model/form-schema'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import Dropdown from '@/components/dropdown/dropdown'
import CustomTextField from '@/components/text-field'
import ROUTES from '@/constants/routes'
import { componentNameOptions } from '@/shared/draw-comps/lib/component-list'
import { errorMessage } from '@/shared/toast'
import { Schema } from '@/types/form-constructor'

// TODO tuple
const options: IDropdownOption[] = [
  {
    text: 'форма',
    key: 'FORM',
  },
  {
    text: 'пресет',
    key: 'PRESET',
  },
  {
    text: 'компонент',
    key: 'COMP',
  },
]

export default function SchemaForm(): JSX.Element {
  const { t } = useTranslation()
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const { id } = useParams()

  async function deleteForm() {
    const response = await fetch('/api/v1/schemas', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [FSchema.id] }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    if (response.ok) {
      console.log('схема удалена')
      window.location.replace(ROUTES.SCHEMA_LIST.buildURL())
    }
  }

  async function onSubmit(newFschema: Schema) {
    const { name, type } = newFschema

    const response = await fetch('/api/v1/schemas', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({ ...FSchema, name, type }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    if (!response.ok) {
      errorMessage('Не удалось сделать запрос')
    }
  }

  function onDropdownChange(type: string) {
    setFSchema({ ...FSchema, type })
  }

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
              {({ input }) => <CustomTextField key="1" label={t(`fieldNames.name`)} underlined {...input} />}
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
            <PrimaryButton onClick={deleteForm}>Delete</PrimaryButton>
          </Stack>
        )
      }}
    />
  )
}
