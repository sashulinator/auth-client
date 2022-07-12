import { Stack } from '@fluentui/react'

import IncidentForm from './incident-form/incident-form'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useGetDependencySchemas } from '@/api/comp-schema'
import { useGetIncident } from '@/api/incident/get'
import { LayoutNames, useSetLayout } from '@/lib/set-layout'

const IncidentId = 'd79d37b9-21a5-4017-a13d-27106cf749d8'

export default function Incident(): JSX.Element {
  useSetLayout(LayoutNames.headerNavMain)

  const { id } = useParams()

  const { data: fetchedSchemas } = useGetDependencySchemas([IncidentId])
  const { data: fetchedIncident } = useGetIncident(id)

  const schema = fetchedSchemas?.[IncidentId]

  return (
    <>
      <Stack as="main" className="Incident" style={{ maxWidth: '900px' }} tokens={{ padding: '32px 32px 50vh 0' }}>
        {(id ? !!fetchedIncident : true) && fetchedSchemas && schema && (
          <IncidentForm schemas={fetchedSchemas} incident={fetchedIncident} schema={schema} />
        )}
      </Stack>
    </>
  )
}
