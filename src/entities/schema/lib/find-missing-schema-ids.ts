import { findSchemaDependencies } from './find-schema-dependencies'

import { Catalog, CompSchema } from '@/shared/schema-drawer'

export function findMissingSchemaIds(schema: CompSchema, schemas: Catalog<CompSchema> | null) {
  if (!schemas) {
    return findSchemaDependencies(schema.comps)
  }

  const existingSchemaIds = Object.keys(schemas)
  const dependencySchemaIds = findSchemaDependencies(schema.comps)

  const missingSchemaIds = dependencySchemaIds.filter((id) => !existingSchemaIds.includes(id))

  return [...new Set(missingSchemaIds)]
}
