import { assertNotNil, isEmpty } from '@savchenko91/schema-validator'

import { stringify } from 'qs'
import { UseQueryResult, useQuery } from 'react-query'

import { assertsSchema } from '@/common/schemas'
import { Norm, Schema } from '@/common/types'
import { isNormSchemas } from '@/common/validators'
import ErrorFromObject from '@/lib/error-from-object'

type GetSchemaParams = {
  queryKey: (string | undefined)[]
}

// CREATE SCHEMA

export async function createSchema(newFSchema: Schema): Promise<Schema> {
  assertsSchema(newFSchema)

  const response = await fetch('/api/v1/schemas', {
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

  assertsSchema(newFSchema)

  return data
}

// UPDATE SCHEMA

export async function updateSchema(newFSchema: Schema): Promise<Schema> {
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

export async function getSchema(params: GetSchemaParams): Promise<Schema | undefined> {
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

  return schema as Schema
}

type GetSchemaListParams = {
  queryKey: (string[] | string | undefined)[]
}

export async function getSchemaList(params: GetSchemaListParams): Promise<Schema[]> {
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

  return schemas as Schema[]
}

type GetSchemasParams = {
  queryKey: (string[] | string | undefined)[]
}

export async function getSchemas(params: GetSchemasParams): Promise<Norm<Schema>> {
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

  return schemas as Norm<Schema>
}

export function useGetDependencySchemas(ids: string[]): UseQueryResult<Norm<Schema> | undefined> {
  return useQuery(['schemasDependencies', ...ids], queryFn)

  async function queryFn(): Promise<Norm<Schema> | undefined> {
    if (isEmpty(ids)) {
      return undefined
    }

    const req = await fetch(`/api/v1/schemas/dependencies?${stringify({ ids })}`, {
      headers: {
        accept: 'application/json',
      },
    })

    const data = await req.json()

    isNormSchemas(data)

    return data
  }
}
