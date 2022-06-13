import { Catalog, Schema } from '@/shared/schema-drawer'

export function findSchemaContainingCompId(compId = '', schemas: Catalog<Schema> | null): Schema | null {
  if (schemas === null) {
    return null
  }

  return Object.values(schemas).find((schema) => schema.comps[compId]) ?? null
}
