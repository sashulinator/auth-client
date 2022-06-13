import { Catalog, Comp } from '@/shared/schema-drawer'

export function findSchemaDependencies(comps: Catalog<Comp>) {
  return Object.values(comps).map((comp) => comp.compSchemaId)
}
