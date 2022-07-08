import { Comp, Dictionary, LinkedComp, isComp } from '@/shared/schema-drawer'

export function findSchemaDependencies(comps: Dictionary<Comp | LinkedComp>) {
  const dependency = Object.values(comps).map((comp) => (isComp(comp) ? comp.compSchemaId : comp.linkedSchemaId))
  return [...new Set(dependency)]
}
