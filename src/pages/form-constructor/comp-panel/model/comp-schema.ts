import { assertNotUndefined } from '@savchenko91/schema-validator'

import { compSchemaMock } from './comp-schema.mock'
import { atom, selector } from 'recoil'

import { pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'

export const CSchemasState = atom({
  key: 'CSchemasState',
  default: compSchemaMock,
})

export const pickedCSchemaState = selector({
  key: 'pickedCSchemaState',
  get: ({ get }) => {
    const compSchemas = get(CSchemasState)
    const pickedFComp = get(pickedFCompState)

    if (pickedFComp) {
      const pickedCSchema = compSchemas[pickedFComp.compSchemaId]

      assertNotUndefined(pickedCSchema)

      return pickedCSchema
    }

    return null
  },
})
