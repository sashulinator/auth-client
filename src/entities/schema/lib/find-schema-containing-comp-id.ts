import { CompSchema, Dictionary } from '@/shared/schema-drawer'

export function findSchemaContainingCompId(compId = '', schemas: Dictionary<CompSchema> | null): CompSchema | null {
  if (schemas === null) {
    return null
  }

  return Object.values(schemas).find((schema) => schema.data[compId]) ?? null
}
