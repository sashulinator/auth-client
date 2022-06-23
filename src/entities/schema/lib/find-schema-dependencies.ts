import { Catalog, Comp } from '@/shared/schema-drawer'

export function findSchemaDependencies(comps: Catalog<Comp>) {
  const dependency = Object.values(comps).map((comp) => comp.compSchemaId)
  return [...new Set(dependency)]
}
