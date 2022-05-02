import { atom, selector } from 'recoil'

import { CSchemasIdsInSchemaState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import { Norm, Schema } from '@/types/form-constructor'

export const CSchemasState = atom<null | Norm<Schema>>({
  key: 'CSchemasState',
  default: null,
})

export const pickedCSchemaState = selector({
  key: 'pickedCSchemaState',
  get: ({ get }) => {
    const CSchemas = get(CSchemasState)
    const pickedFComp = get(pickedFCompState)

    if (pickedFComp && CSchemas) {
      const pickedCSchema = CSchemas[pickedFComp.compSchemaId]

      if (pickedCSchema === undefined) {
        return null
      }

      return pickedCSchema
    }

    return null
  },
})

export const lackOfCSchemaIdsState = selector({
  key: 'lackOfCSchemaIdsState',
  get: ({ get }) => {
    const CSchemas = get(CSchemasState)
    const CSchemasIdsInSchema = get(CSchemasIdsInSchemaState)

    if (!CSchemas) {
      return CSchemasIdsInSchema
    }

    const CSchemasIdsPossessed = Object.keys(CSchemas)

    const lackOfCSchemaIds = CSchemasIdsInSchema.filter((x) => !CSchemasIdsPossessed.includes(x))

    return [...new Set(lackOfCSchemaIds)]
  },
})
