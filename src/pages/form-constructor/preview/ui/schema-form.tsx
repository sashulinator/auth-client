import { IDropdownOption, PrimaryButton, Stack } from '@fluentui/react'

import { FSchemaState } from '../model/form-schema'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import Dropdown from '@/components/dropdown/dropdown'
import CustomTextField from '@/components/text-field'
import ROUTES from '@/constants/routes'
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
    text: 'контент компонент',
    key: 'CONTENT_COMP',
  },
  {
    text: 'инпут компонент',
    key: 'INPUT_COMP',
  },
]

function SchemaForm(): JSX.Element {
  const { t } = useTranslation()
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)

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
      method: 'PUT',
      body: JSON.stringify({ ...FSchema, name, type }),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    if (!response.ok) {
      // TODO обработать ошибку
      throw new Error('Problem fetching data')
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
                  styles={{ root: { width: '200px' } }}
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
            <PrimaryButton type="submit">Save form</PrimaryButton>
            <PrimaryButton onClick={deleteForm}>Delete</PrimaryButton>
          </Stack>
        )
      }}
    />
  )
}

export default SchemaForm
