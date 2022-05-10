import findSchemaContainingCompId from './find-schema-containing-comp-id'

import { Norm, Schema } from '@/entities/schema'

export default function findCompSchema(compId = '', schemas: Norm<Schema> | null): Schema | null {
  if (schemas === null) {
    return null
  }

  const comp = findSchemaContainingCompId(compId, schemas)?.comps[compId]

  if (comp === undefined) {
    return null
  }

  const schema = schemas[comp.compSchemaId] ?? null

  return schema
}
