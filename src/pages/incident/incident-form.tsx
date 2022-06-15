import { Stack } from '@fluentui/react'

import IncidentForm from './incident-form/incident-form'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { getIncident } from '@/api/incident'
import { useGetDependencySchemas } from '@/api/schema'

const IncidentId = 'd79d37b9-21a5-4017-a13d-27106cf749d8'

export default function Incident(): JSX.Element {
  const { id } = useParams()

  const { data: schemas } = useGetDependencySchemas([IncidentId])
  const { data: incident } = useQuery(['incident', id], getIncident)

  const schema = schemas?.[IncidentId]

  return (
    <Stack className="mainLayout">
      <Stack as="main" className="Incident" style={{ maxWidth: '900px' }} tokens={{ padding: '32px 32px 50vh 0' }}>
        {(id ? !!incident : true) && schemas && schema && (
          <IncidentForm schemas={schemas} schema={schema} incident={incident} />
        )}
      </Stack>
    </Stack>
  )
}
