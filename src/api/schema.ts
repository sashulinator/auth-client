import { assertNotNil, isEmpty } from '@savchenko91/schema-validator'

import { stringify } from 'qs'
import { UseQueryResult, useQuery } from 'react-query'

import { Norm, Schema } from '@/common/types'
import { isNormSchemas } from '@/common/validators'
import { errorMessage } from '@/shared/toast'

type GetSchemaParams = {
  queryKey: (string | undefined)[]
}

export async function getSchema(params: GetSchemaParams): Promise<Schema | undefined> {
  const [, id] = params.queryKey

  if (id === undefined) {
    return undefined
  }

  const response = await fetch(`/api/v1/schemas/${id}`, {
    headers: {
      'content-type': 'application/json',
      accept: '*/*',
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

type UpdateSchemaParams = {
  queryKey: (Schema | string | undefined)[]
}

export async function updateSchema(params: UpdateSchemaParams): Promise<Schema> {
  const [, schemaInput] = params.queryKey

  const response = await fetch('/api/v1/schemas', {
    method: 'PUT',
    body: JSON.stringify(schemaInput),
    headers: {
      'content-type': 'application/json',
      accept: '*/*',
    },
  })

  if (!response.ok) {
    errorMessage('Не удалось сделать запрос')
  }
  const schema = await response.json()

  // TODO провалидировать схемы

  assertNotNil(schema)

  return schema as Schema
}

export function useGetSchemaDependency(ids: string[]): UseQueryResult<Norm<Schema> | undefined> {
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
