import { Stack } from '@fluentui/react'

import IncidentForm from './incident-form/incident-form'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetDependencySchemas } from '@/api/comp-schema'
import { useGetIncident } from '@/api/incident/get'
import { LayoutNames, useSetLayout } from '@/lib/set-layout'
import LoadingAria from '@/shared/loading-aria'

const IncidentSchemaId = 'd79d37b9-21a5-4017-a13d-27106cf749d8'

export default function Incident(): JSX.Element {
  useSetLayout(LayoutNames.headerNavMain)
  const [state, setState] = useState('init')
  const { id } = useParams()

  const { data: fetchedSchemas, isLoading: isDependencySchemasLoading } = useGetDependencySchemas([IncidentSchemaId])
  const { data: fetchedIncident, isLoading: isIncidentLoading } = useGetIncident(id)

  const schema = fetchedSchemas?.[IncidentSchemaId]

  if (!isDependencySchemasLoading && !schema) {
    throw new Error('Something went wrong!')
  }

  function buildLabel() {
    const entityNames = []
    if (isDependencySchemasLoading) {
      entityNames.push('schema')
    }
    if (isIncidentLoading) {
      entityNames.push('incident')
    }
    return `Loading ${entityNames.join(', ')}`
  }

  function reload() {
    setState(Math.random().toString())
  }

  const schemaErrorMessage = fetchedSchemas instanceof Error && fetchedSchemas.message
  const incidentErrorMessage = fetchedIncident instanceof Error && fetchedIncident.message
  const errorMessage = schemaErrorMessage || incidentErrorMessage

  return (
    <Stack as="main" className="Incident" tokens={{ padding: '0 0 50vh 0' }}>
      <LoadingAria loading={(isIncidentLoading || isDependencySchemasLoading) && !errorMessage} label={buildLabel()}>
        <>
          {errorMessage ? errorMessage : null}
          {(id ? !!fetchedIncident : true) && fetchedSchemas && schema && !errorMessage && (
            <IncidentForm
              refetch={reload}
              key={`${id || ''}${state}`}
              schemas={fetchedSchemas}
              incident={(fetchedIncident as any)?.dataBlock}
              schema={schema}
            />
          )}
        </>
      </LoadingAria>
    </Stack>
  )
}
