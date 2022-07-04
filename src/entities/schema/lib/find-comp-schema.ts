import { Catalog, Comp, CompSchema, LinkedComp, isLinkedComp } from '@/shared/schema-drawer'

export function findCompSchema(comp: Comp | null | LinkedComp, schemas: Catalog<CompSchema> | null): CompSchema | null {
  if (schemas === null || comp === null) {
    return null
  }

  const schema = isLinkedComp(comp) ? schemas[comp.linkedSchemaId] : schemas[comp.compSchemaId]

  if (!schema) {
    return null
  }

  return schema
}
