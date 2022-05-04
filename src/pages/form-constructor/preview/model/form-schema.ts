import { assertNotUndefined } from '@savchenko91/schema-validator'

import { atom, selector } from 'recoil'

import { FormType, Schema } from '@/common/types'
import { ROOT_COMP_ID } from '@/constants/common'

export const FSchemaState = atom<Schema>({
  key: 'FSchemaState',
  default: {
    // TODO Попробовать удалить id
    id: '',
    componentName: null,
    name: 'Name',
    type: FormType.FORM,
    comps: {
      [ROOT_COMP_ID]: {
        id: ROOT_COMP_ID,
        name: 'stackRoot',
        compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
        path: 'hello',
      },
    },
  },
})

export const pickedFCompIdsState = atom<string[]>({
  key: 'pickedFCompIdsState',
  default: [],
})

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const FSchema = get(FSchemaState)
    const pickedFCompIds = get(pickedFCompIdsState)

    if (pickedFCompIds.length > 1) {
      return null
    }

    if (pickedFCompIds.length !== 0 && FSchema) {
      const pickedFComp = FSchema.comps[pickedFCompIds[0] || '']

      assertNotUndefined(pickedFComp)

      return pickedFComp
    }

    return null
  },
})

export const CSchemasIdsInSchemaState = selector({
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
