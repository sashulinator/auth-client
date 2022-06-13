import { Catalog, Comp, Schema } from '@/shared/schema-drawer'

export function findCompSchema(comp: Comp | null, schemas: Catalog<Schema> | null): Schema | null {
  if (schemas === null || comp === null) {
    return null
  }

  const schema = schemas[comp.compSchemaId]

  if (!schema) {
    return null
  }

  return schema
}
