import uniqid from 'uniqid'

import { Comp, Schema } from '@/common/types'

export function createNewComp(schema: Schema): Comp {
  schema

  return {
    id: uniqid(),
    path: uniqid(),
    compSchemaId: schema.id,
    name: schema.name,
  }
}
