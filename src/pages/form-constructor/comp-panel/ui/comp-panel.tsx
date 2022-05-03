import { Stack } from '@fluentui/react'

import { CSchemasState, lackOfCSchemaIdsState, pickedCSchemaState } from '../model/comp-schema'
import CompContextualMenu from './contextual-menu'
import React, { FC, useEffect } from 'react'
import { Form } from 'react-final-form'
import PerfectScrollbar from 'react-perfect-scrollbar'
// import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { useGetSchemaDependency } from '@/api/schema'
import { Comp } from '@/common/types'
import { FSchemaState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import CompDrawer from '@/shared/draw-comps'
import { replace } from '@/utils/change-unmutable'
import debounce from '@/utils/debounce'

const CompPanel: FC = (): JSX.Element => {
  // const { t } = useTranslation()
  const [CSchemas, setCSchemas] = useRecoilState(CSchemasState)
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const lackOfCSchemaIds = useRecoilValue(lackOfCSchemaIdsState)
  const resetCSchemas = useResetRecoilState(CSchemasState)

  const { data, isLoading } = useGetSchemaDependency(lackOfCSchemaIds)

  useEffect(() => resetCSchemas, [])

  useEffect(() => {
    if (data !== undefined) {
      setCSchemas({ ...data, ...CSchemas })
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
    <PerfectScrollbar className="CompPanel">
      {pickedCSchema && pickedFComp && CSchemas && (
        <Form<Comp, Comp>
          initialValues={pickedFComp}
          onSubmit={debounce(onSubmit, 750)}
          render={(formProps) => {
            return (
              <Stack
                as="form"
                tokens={{ padding: '0 0 30vh' }}
                onSubmit={(e) => e.preventDefault()}
                onChange={formProps.handleSubmit}
              >
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
              </Stack>
            )
          }}
        />
      )}
      {!isLoading && pickedFComp && !pickedCSchema && <CompContextualMenu />}
    </PerfectScrollbar>
  )
}

export default CompPanel
