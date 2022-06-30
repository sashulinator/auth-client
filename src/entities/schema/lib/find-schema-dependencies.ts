import { Catalog, Comp, LinkedComp, isComp } from '@/shared/schema-drawer'

export function findSchemaDependencies(comps: Catalog<Comp | LinkedComp>) {
  const dependency = Object.values(comps).map((comp) => (isComp(comp) ? comp.compSchemaId : comp.linkedSchemaId))
  return [...new Set(dependency)]
}
