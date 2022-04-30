import { atom, selector } from 'recoil'

import { pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import { Norm, Schema } from '@/types/form-constructor'

export const CSchemasState = atom<null | Norm<Schema>>({
  key: 'CSchemasState',
  default: null,
})

export const pickedCSchemaState = selector({
  key: 'pickedCSchemaState',
  get: ({ get }) => {
    const compSchemas = get(CSchemasState)
    const pickedFComp = get(pickedFCompState)

    if (pickedFComp && compSchemas) {
      const pickedCSchema = compSchemas[pickedFComp.compSchemaId]

      if (pickedCSchema === undefined) {
        return null
      }

      return pickedCSchema
    }

    return null
  },
})
