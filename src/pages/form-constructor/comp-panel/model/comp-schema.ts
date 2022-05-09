import { atom, selector } from 'recoil'

import { Norm, Schema } from '@/common/types'
import { CSchemasIdsInSchemaState } from '@/entities/schema'

export const schemasState = atom<null | Norm<Schema>>({
  key: 'schemasState',
  default: null,
})

export const selectedCompSchemaState = atom<null | Schema>({
  key: 'selectedCompSchema',
  default: null,
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
