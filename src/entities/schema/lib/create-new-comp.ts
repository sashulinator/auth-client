import { assertNotUndefined } from '@savchenko91/schema-validator'

import { componentListBlind } from '../schema-drawer/lib/component-list'
import uniqid from 'uniqid'

import { Comp, Schema } from '@/entities/schema'

export default function createNewComp(schema: Schema): Comp {
  const component = componentListBlind[schema.componentName || '']
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
