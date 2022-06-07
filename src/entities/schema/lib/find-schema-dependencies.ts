import { Comp, Norm } from '../schema-drawer/model/types'

export default function findSchemaDependencies(comps: Norm<Comp>) {
  return Object.values(comps).map((comp) => comp.compSchemaId)
}
