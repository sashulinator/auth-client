import { atom, selector } from 'recoil'

import { CSchemasIdsInSchemaState, Norm, Schema } from '@/entities/schema'

export const schemasState = atom<null | Norm<Schema>>({
  key: 'schemasState',
  default: null,
})

export const selectedCompSchemaState = atom<null | Schema>({
  key: 'selectedCompSchema',
  default: null,
})

// TODO вынести в отдельную функцию чтобы этот стейт ничего не знал о других
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
