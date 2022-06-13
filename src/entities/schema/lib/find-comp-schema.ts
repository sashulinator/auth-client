import { Catalog, Comp, CompSchema } from '@/shared/schema-drawer'

export function findCompSchema(comp: Comp | null, schemas: Catalog<CompSchema> | null): CompSchema | null {
  if (schemas === null || comp === null) {
    return null
  }

  const schema = schemas[comp.compSchemaId]

  if (!schema) {
    return null
  }

  return schema
}
