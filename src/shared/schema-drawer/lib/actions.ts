import uniqid from 'uniqid'

import { Comp, Schema } from '@/entities/schema'

export function createNewComp(schema: Schema): Comp {
  const comp: Comp = {
    id: uniqid(),
    name: uniqid(),
    title: schema.title,
    compSchemaId: schema.id,
  }

  const defaultValueComp = Object.values(schema.comps).find((comp) => comp.defaultValue !== undefined)

  if (defaultValueComp) {
    comp.defaultValue = defaultValueComp.defaultValue
  }

  return comp
}
