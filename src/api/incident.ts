import { assertNotNil } from '@savchenko91/schema-validator'

import { UpdateInputIncident } from '@/entities/incident/model/types'
import ErrorFromObject from '@/lib/error-from-object'
import { CompSchema } from '@/shared/schema-drawer'

// UPDATE SCHEMA

export async function updateIncident(newFSchema: UpdateInputIncident): Promise<UpdateInputIncident> {
  const response = await fetch(`/api/incident/${newFSchema.instanceId}`, {
    method: 'PUT',
    body: JSON.stringify(newFSchema),
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      userRole: 'USER',
      user: 'USER',
      incidentId: newFSchema.instanceId,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ErrorFromObject(data)
  }

  return data
}

// type GetSchemaListParams = {
//   queryKey: (string[] | string | undefined)[]
// }

export async function getIncidentList(): Promise<CompSchema[]> {
  // const [, ids] = params.queryKey

  const response = await fetch(`/api/incident`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    // TODO обработать ошибку
    throw new Error('Problem fetching data')
  }
  const incidents = await response.json()

  // TODO провалидировать схемы

  assertNotNil(incidents)

  return incidents.dataBlock as CompSchema[]
}
