import { Norm, Schema } from '../schema-drawer/model/types'
import findSchemaDependencies from './find-schema-dependencies'

export default function findMissingSchemas(schema: Schema, schemas: Norm<Schema> | null) {
  if (!schemas) {
    return findSchemaDependencies(schema.comps)
  }

  const existingSchemaIds = Object.keys(schemas)
  const dependencySchemaIds = findSchemaDependencies(schema.comps)

  const missingSchemaIds = dependencySchemaIds.filter((id) => !existingSchemaIds.includes(id))

  return [...new Set(missingSchemaIds)]
}
