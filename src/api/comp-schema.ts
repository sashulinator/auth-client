import { assertNotNil, isEmpty } from '@savchenko91/schema-validator'

import apiFetch from './api-fetch'
import { stringify } from 'qs'
import { UseQueryResult, useQuery } from 'react-query'

import { assertsSchema } from '@/common/schemas'
import ErrorFromObject from '@/lib/error-from-object'
import { CompSchema, Dictionary } from '@/shared/schema-drawer'

const headers = {
  'content-type': 'application/json',
  accept: 'application/json',
}

type GetSchemaParams = {
  queryKey: (string | undefined)[]
}

// CREATE SCHEMA

export async function createCompSchema(newFSchema: CompSchema): Promise<CompSchema> {
  assertsSchema(newFSchema)

  const response = await apiFetch('/api/v1/schemas', {
    method: 'POST',
    body: newFSchema,
    headers,
  })

  if (!response.ok) {
    throw new ErrorFromObject(response.body)
  }

  assertsSchema(newFSchema)

  return response.body
}

// UPDATE SCHEMA

export async function updateCompSchema(newFSchema: CompSchema): Promise<CompSchema> {
  assertsSchema(newFSchema)

  const response = await fetch('/api/v1/schemas', {
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

export async function getCompSchema(params: GetSchemaParams): Promise<CompSchema | undefined> {
  const [, id] = params.queryKey

  if (id === undefined) {
    return undefined
  }

  const response = await fetch(`/api/v1/schemas/${id}`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    // TODO обработать ошибку
    throw new Error('Problem fetching data')
  }
  const schema = await response.json()

  // TODO провалидировать схемы

  assertNotNil(schema)

  return schema as CompSchema
}

type GetSchemaListParams = {
  queryKey: (string[] | string | undefined)[]
}

export async function getCompSchemaList(params: GetSchemaListParams): Promise<CompSchema[]> {
  const [, ids] = params.queryKey

  const response = await fetch(`/api/v1/schemas/list${stringify(ids)}`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    // TODO обработать ошибку
    throw new Error('Problem fetching data')
  }
  const schemas = await response.json()

  // TODO провалидировать схемы

  assertNotNil(schemas)

  return schemas as CompSchema[]
}

type GetSchemasParams = {
  queryKey: (string[] | string | undefined)[]
}

export async function getCompSchemas(params: GetSchemasParams): Promise<Dictionary<CompSchema>> {
  const [, ids] = params.queryKey

  const response = await fetch(`/api/v1/schemas${stringify({ ids }, { addQueryPrefix: true })}`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    // TODO обработать ошибку
    throw new Error('Problem fetching data')
  }
  const schemas = await response.json()

  // TODO провалидировать схемы

  assertNotNil(schemas)

  return schemas as Dictionary<CompSchema>
}

// TODO по сути должен принимать один id так как бэк сам найдет остальные зависимости
export function useGetDependencySchemas(ids: string[]): UseQueryResult<Dictionary<CompSchema> | undefined> {
  return useQuery(['schemasDependencies', ...ids], queryFn)

  async function queryFn(): Promise<Dictionary<CompSchema> | undefined> {
    if (isEmpty(ids)) {
      return undefined
    }

    const req = await fetch(`/api/v1/schemas/dependencies?${stringify({ ids })}`, {
      headers: {
        accept: 'application/json',
      },
    })

    const data = await req.json()

    return data
  }
}
