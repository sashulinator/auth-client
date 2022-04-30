import { PrimaryButton, Stack } from '@fluentui/react'
import { assertNotNull } from '@savchenko91/schema-validator'

import { CSchemasState, pickedCSchemaState } from '../model/comp-schema'
import React, { FC, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getSchemas } from '@/api/schema'
import FieldError from '@/components/field-error'
import CustomTextField from '@/components/text-field'
import { ROOT_COMP_ID } from '@/constants/common'
import { removeComp } from '@/helpers/form-schema-state'
import {
  CSchemasIdsState,
  FSchemaState,
  pickedFCompIdState,
  pickedFCompState,
} from '@/pages/form-constructor/preview/model/form-schema'
import CompDrawer from '@/shared/draw-comps'
import { Comp } from '@/types/form-constructor'
import { replace } from '@/utils/change-unmutable'

const CompPanel: FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [, setCSchemas] = useRecoilState(CSchemasState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const CSchemasIds = useRecoilValue(CSchemasIdsState)

  const { data } = useQuery(['schemas', [...new Set(CSchemasIds)]], getSchemas)

  useEffect(() => {
    if (data !== undefined) {
      setCSchemas(data)
    }
  }, [data])

  function onSubmit(comp: Comp) {
    if (FSchema) {
      const newComps = replace(FSchema.comps, comp.id, comp)
      setFSchema({ ...FSchema, comps: newComps })
    }
  }

  function onDelete() {
    assertNotNull(pickedFComp)
    assertNotNull(FSchema)

    const comps = removeComp(pickedFComp?.id, FSchema.comps)
    setFSchema({ ...FSchema, comps: comps })
    setPickedFCompId('')
  }

  return (
    <div className="CompPanel">
      {pickedCSchema && pickedFComp && (
        <Form<Comp, Comp>
          initialValues={pickedFComp}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                {pickedFComp.id !== ROOT_COMP_ID && <PrimaryButton onClick={onDelete}>delete</PrimaryButton>}
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
