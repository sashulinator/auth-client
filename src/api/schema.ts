import { assertNotNil } from '@savchenko91/schema-validator'

import { Schema } from '@/types/form-constructor'

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
