import { Stack } from '@fluentui/react'

import IncidentForm from './incident-form/incident-form'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useGetDependencySchemas } from '@/api/schema'
import { Norm, Schema, schemasState } from '@/entities/schema'

const IncidentId = 'e84eabbb-b048-4d39-ab10-673605c718e2'

export default function Incident(): JSX.Element {
  const [schemas, setSchemas] = useRecoilState<null | Norm<Schema>>(schemasState)

  const { data: fetchedDependencySchemas } = useGetDependencySchemas([IncidentId])

  const incidentSchema = schemas?.[IncidentId]

  useEffect(() => {
    if (fetchedDependencySchemas) {
      setSchemas(fetchedDependencySchemas)
    }
  }, [fetchedDependencySchemas])

  return (
    <Stack as="main" className="Incident" style={{ padding: '0 0 30vh' }}>
      {incidentSchema && schemas && <IncidentForm schemas={schemas} schema={incidentSchema} />}
    </Stack>
  )
}
