import { assertNotUndefined } from '@savchenko91/schema-validator'

import { atom, selector } from 'recoil'

import { Schema } from '@/types/form-constructor'

export const FSchemaState = atom<null | Schema>({
  key: 'FSchemaState',
  default: null,
})

export const pickedFCompIdState = atom({
  key: 'pickedFCompIdState',
  default: '',
})

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const FSchema = get(FSchemaState)
    const pickedFCompId = get(pickedFCompIdState)

    if (pickedFCompId && FSchema) {
      const pickedFComp = FSchema.comps[pickedFCompId]

      assertNotUndefined(pickedFComp)

      return pickedFComp
    }

    return null
  },
})

export const CSchemasIdsState = selector({
  key: 'CSchemasIdsState',
  get: ({ get }) => {
    const FSchema = get(FSchemaState)

    if (FSchema) {
      const CSchemasIds = Object.values(FSchema.comps).map((comp) => comp.compSchemaId)

      return CSchemasIds
    }

    return []
  },
})
