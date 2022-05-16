import { Comp, Norm, Schema } from '@/entities/schema'

export default function findCompSchema(comp: Comp | null, schemas: Norm<Schema> | null): Schema | null {
  if (schemas === null || comp === null) {
    return null
  }

  const schema = schemas[comp.compSchemaId]

  if (!schema) {
    return null
  }

  return schema
}
