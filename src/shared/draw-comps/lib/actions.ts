import uniqid from 'uniqid'

import { Comp, Schema } from '@/common/types'

export function createNewComp(schema: Schema): Comp {
  schema

  return {
    id: uniqid(),
    name: uniqid(),
    title: schema.title,
    compSchemaId: schema.id,
  }
}
