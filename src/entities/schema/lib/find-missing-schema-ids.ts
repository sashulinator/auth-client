import { findSchemaDependencies } from './find-schema-dependencies'

import { CompSchema, CreateCompSchema, Dictionary } from '@/shared/schema-drawer'

export function findMissingSchemaIds(
  schema: CompSchema | CreateCompSchema | null | undefined,
  schemas: Dictionary<CompSchema> | null
) {
  if (schemas === null || !schema) {
    return []
  }

  if (schemas && Object.keys(schemas).length === 1) {
    return findSchemaDependencies(schema.data)
  }

  const existingSchemaIds = Object.keys(schemas)
  const dependencySchemaIds = findSchemaDependencies(schema.data)

  const missingSchemaIds = dependencySchemaIds.filter((id) => !existingSchemaIds.includes(id))

  return [...new Set(missingSchemaIds)]
}
