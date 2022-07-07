import { assertNotNil } from '@savchenko91/schema-validator'

import { assertsSchema } from '@/common/schemas'
import { CreateInputIncident, UpdateInputIncident } from '@/entities/incident/model/types'
import ErrorFromObject from '@/lib/error-from-object'
import { CompSchema } from '@/shared/schema-drawer'

type GetSchemaParams = {
  queryKey: (string | undefined)[]
}

// CREATE SCHEMA

export async function createIncident(newFSchema: CreateInputIncident): Promise<UpdateInputIncident> {
  const response = await fetch('/api/incident', {
    method: 'POST',
    body: JSON.stringify(newFSchema),
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      userRole: 'USER',
      user: 'USER',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ErrorFromObject(data)
  }

  return data
}

// UPDATE SCHEMA

export async function updateIncident(newFSchema: UpdateInputIncident): Promise<UpdateInputIncident> {
  const response = await fetch('/api/v1/incidents', {
    method: 'PUT',
    body: JSON.stringify(newFSchema),
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ErrorFromObject(data)
  }

  assertsSchema(data)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as any
}

export async function getIncident(params: GetSchemaParams): Promise<CompSchema | undefined> {
  const [, id] = params.queryKey

  if (id === undefined) {
    return undefined
  }

  const response = await fetch(`/api/v1/incidents/${id}`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    // TODO обработать ошибку
    throw new Error('Problem fetching data')
  }
  const incident = await response.json()

  // TODO провалидировать схемы

  assertNotNil(incident)

  return incident as CompSchema
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
