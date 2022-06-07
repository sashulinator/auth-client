import { Norm, Schema } from '@/shared/schema-drawer'

export default function findSchemaContainingCompId(compId = '', schemas: Norm<Schema> | null): Schema | null {
  if (schemas === null) {
    return null
  }

  return Object.values(schemas).find((schema) => schema.comps[compId]) ?? null
}
