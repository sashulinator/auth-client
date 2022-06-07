import { assertNotUndefined } from '@savchenko91/schema-validator'

import uniqid from 'uniqid'

import { Comp, ComponentItem, Schema } from '@/shared/schema-drawer'

export default function createNewComp(schema: Schema, componentList: Record<string, ComponentItem>): Comp {
  const component = componentList[schema.componentName || '']
  assertNotUndefined(component)

  const comp: Comp = {
    id: uniqid(),
    title: schema.title,
    compSchemaId: schema.id,
  }

  if (component.type === 'content') {
    comp.name = uniqid()
  }

  // const defaultValueComp = Object.values(schema.comps).find((comp) => comp.defaultValue !== undefined)

  // if (defaultValueComp) {
  //   comp.defaultValue = defaultValueComp.defaultValue
  // }

  return comp
}
