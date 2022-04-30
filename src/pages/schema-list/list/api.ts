import { assertNotNil } from '@savchenko91/schema-validator'

import { Schema } from '@/types/form-constructor'

export async function getSchemas(): Promise<Schema[]> {
  const response = await fetch('/api/v1/schemas', {
    headers: {
      'content-type': 'application/json',
      accept: '*/*',
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
