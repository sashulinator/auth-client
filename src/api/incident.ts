import { assertNotNil } from '@savchenko91/schema-validator'

import { stringify } from 'qs'

import { assertsSchema } from '@/common/schemas'
import { Incident } from '@/entities/incident/model/types'
import { Schema } from '@/entities/schema'
import ErrorFromObject from '@/lib/error-from-object'

type GetSchemaParams = {
  queryKey: (string | undefined)[]
}

// CREATE SCHEMA

export async function createIncident(newFSchema: Incident): Promise<Schema> {
  const response = await fetch('/api/v1/incidents', {
    method: 'POST',
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

  return data
}

// UPDATE SCHEMA

export async function updateIncident(newFSchema: Schema): Promise<Schema> {
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

  return data
}

export async function getIncident(params: GetSchemaParams): Promise<Schema | undefined> {
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

  return incident as Schema
}

type GetSchemaListParams = {
  queryKey: (string[] | string | undefined)[]
}

export async function getIncidentList(params: GetSchemaListParams): Promise<Schema[]> {
  const [, ids] = params.queryKey

  const response = await fetch(`/api/v1/incidents/list${stringify(ids)}`, {
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

  return incidents as Schema[]
}
