import { assertNotUndefined } from '@savchenko91/schema-validator'

import { compSchemaMock } from './comp-schema.mock'
import { pickedFCompState } from './form-schema'
import { atom, selector } from 'recoil'

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
      const pickedCSchema = compSchemas[pickedFComp.componentSchemaId]

      assertNotUndefined(pickedCSchema)

      return pickedCSchema
    }

    return null
  },
})
