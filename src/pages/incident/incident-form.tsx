import { Stack } from '@fluentui/react'

import IncidentForm from './incident-form/incident-form'
import React from 'react'
import { useParams } from 'react-router-dom'

import { useGetDependencySchemas } from '@/api/comp-schema'
import { useGetIncident } from '@/api/incident/get'
import { LayoutNames, useSetLayout } from '@/lib/set-layout'
import LoadingAria from '@/shared/loading-aria'

const IncidentSchemaId = 'd79d37b9-21a5-4017-a13d-27106cf749d8'

export default function Incident(): JSX.Element {
  useSetLayout(LayoutNames.headerNavMain)

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

  const schemaErrorMessage = fetchedSchemas instanceof Error && fetchedSchemas.message
  const incidentErrorMessage = fetchedIncident instanceof Error && fetchedIncident.message
  const errorMessage = schemaErrorMessage || incidentErrorMessage

  console.log('errorMessage', errorMessage)

  return (
    <Stack as="main" className="Incident" style={{ maxWidth: '900px' }} tokens={{ padding: '32px 32px 50vh 0' }}>
      <LoadingAria loading={(isIncidentLoading || isDependencySchemasLoading) && !errorMessage} label={buildLabel()}>
        <>
          {errorMessage ? errorMessage : null}
          {(id ? !!fetchedIncident : true) && fetchedSchemas && schema && !errorMessage && (
            <IncidentForm
              key={id}
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
