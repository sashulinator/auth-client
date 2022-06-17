import { findSchemaDependencies } from './find-schema-dependencies'

import { Catalog, CompSchema } from '@/shared/schema-drawer'

export function findMissingSchemaIds(schema: CompSchema, schemas: Catalog<CompSchema> | null) {
  if (schemas === null) {
    return []
  }

  if (schemas && Object.keys(schemas).length === 1) {
    return findSchemaDependencies(schema.catalog)
  }

  const existingSchemaIds = Object.keys(schemas)
  const dependencySchemaIds = findSchemaDependencies(schema.catalog)

  const missingSchemaIds = dependencySchemaIds.filter((id) => !existingSchemaIds.includes(id))

  return [...new Set(missingSchemaIds)]
}
