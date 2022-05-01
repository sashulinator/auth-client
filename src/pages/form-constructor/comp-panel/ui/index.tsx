import { PrimaryButton, Stack } from '@fluentui/react'

import { CSchemasState, pickedCSchemaState } from '../model/comp-schema'
import CompContextualMenu from './contextual-menu'
import React, { FC, useEffect } from 'react'
import { Form } from 'react-final-form'
// import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { getSchemas } from '@/api/schema'
import { CSchemasIdsState, FSchemaState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import CompDrawer from '@/shared/draw-comps'
import { Comp } from '@/types/form-constructor'
import { replace } from '@/utils/change-unmutable'

const CompPanel: FC = (): JSX.Element => {
  // const { t } = useTranslation()
  const [CSchemas, setCSchemas] = useRecoilState(CSchemasState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const CSchemasIds = useRecoilValue(CSchemasIdsState)
  const resetCSchemas = useResetRecoilState(CSchemasState)

  const { data, isLoading } = useQuery(['schemas', [...new Set(CSchemasIds)]], getSchemas)

  useEffect(() => resetCSchemas, [])

  useEffect(() => {
    if (data !== undefined) {
      setCSchemas(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  function onSubmit(comp: Comp) {
    if (FSchema) {
      const newComps = replace(FSchema.comps, comp.id, comp)
      setFSchema({ ...FSchema, comps: newComps })
    }
  }

  return (
    <div className="CompPanel">
      {pickedCSchema && pickedFComp && CSchemas && (
        <Form<Comp, Comp>
          initialValues={pickedFComp}
          onSubmit={onSubmit}
          render={(formProps) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <Stack
                  tokens={{ padding: '20px 20px 0' }}
                  horizontal={true}
                  horizontalAlign="space-between"
                  verticalAlign="center"
                >
                  <Stack as="h2">{pickedFComp.name}</Stack>
                  <CompContextualMenu />
                </Stack>
                <Stack>
                  <CompDrawer comps={pickedCSchema.comps} schemas={CSchemas} />
                </Stack>
                <Stack tokens={{ padding: '20px 20px' }}>
                  <PrimaryButton type="submit">save</PrimaryButton>
                </Stack>
              </form>
            )
          }}
        />
      )}
      {!isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </div>
  )
}

export default CompPanel
