import { Catalog, CompSchema } from '@/shared/schema-drawer'

export function findSchemaContainingCompId(compId = '', schemas: Catalog<CompSchema> | null): CompSchema | null {
  if (schemas === null) {
    return null
  }

  return Object.values(schemas).find((schema) => schema.catalog[compId]) ?? null
}
