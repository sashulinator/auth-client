import { Comp, Norm } from '@/shared/schema-drawer'

export function findSchemaDependencies(comps: Norm<Comp>) {
  return Object.values(comps).map((comp) => comp.compSchemaId)
}
