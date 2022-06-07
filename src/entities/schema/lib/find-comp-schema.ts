import { Comp, Norm, Schema } from '@/shared/schema-drawer'

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
