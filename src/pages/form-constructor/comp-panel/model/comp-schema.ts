import { atom, selector } from 'recoil'

import { Norm, Schema } from '@/common/types'
import { CSchemasIdsInSchemaState, pickedFCompState } from '@/entities/schema'

export const schemasState = atom<null | Norm<Schema>>({
  key: 'CSchemasState',
  default: null,
})

export const pickedCSchemaState = selector({
  key: 'pickedCSchemaState',
  get: ({ get }) => {
    const CSchemas = get(schemasState)
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
    const CSchemas = get(schemasState)
    const CSchemasIdsInSchema = get(CSchemasIdsInSchemaState)

    if (!CSchemas) {
      return CSchemasIdsInSchema
    }

    const CSchemasIdsPossessed = Object.keys(CSchemas)

    const lackOfCSchemaIds = CSchemasIdsInSchema.filter((id) => !CSchemasIdsPossessed.includes(id))

    return [...new Set(lackOfCSchemaIds)]
  },
})
