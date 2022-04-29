import { PrimaryButton, Stack } from '@fluentui/react'

import { pickedCSchemaState } from '../model/comp-schema'
import arrayMutators from 'final-form-arrays'
import React, { FC } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import FieldError from '@/components/field-error'
import { CompDrawer } from '@/components/schema-constructor'
import CustomTextField from '@/components/text-field'
import { removeComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'

const CompPanel: FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)

  return (
    <div className="CompPanel">
      {pickedCSchema && pickedFComp && (
        <Form
          initialValues={pickedFComp}
          mutators={{
            // potentially other mutators could be merged here
            ...arrayMutators,
          }}
          onSubmit={console.log}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <PrimaryButton
                  onClick={() => {
                    const comps = removeComp(pickedFComp.id, FSchema.comps)
                    setFSchema({ ...FSchema, comps: comps })
                    setPickedFCompId('')
                  }}
                >
                  delete
                </PrimaryButton>
                <Stack tokens={{ padding: '20px 20px 0' }}>
                  <Stack as="h2">{pickedFComp.name}</Stack>
                </Stack>
                <Stack tokens={{ padding: '20px 20px' }}>
                  <Field<string> name="name">
                    {({ input, meta }) => [
                      <CustomTextField key="1" label={t(`fieldNames.name`)} {...input} />,
                      <FieldError key="2" error={meta.touched && (meta.error || meta.submitError)} />,
                    ]}
                  </Field>
                  <CompDrawer comps={pickedCSchema.comps} />
                </Stack>
                <Stack tokens={{ padding: '20px 20px' }}>
                  <PrimaryButton type="submit">save</PrimaryButton>
                </Stack>
              </form>
            )
          }}
        />
      )}
    </div>
  )
}

export default CompPanel
