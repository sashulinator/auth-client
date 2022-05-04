import { assertNotUndefined } from '@savchenko91/schema-validator'

import { atom, selector } from 'recoil'

import { Comp, FormType, History, Norm, Schema } from '@/common/types'
import { ROOT_COMP_ID } from '@/constants/common'

// STATES

export const FSchemaHistoryState = atom<History<Schema>>({
  key: 'FSchemaState',
  default: {
    prev: null,
    next: null,
    data: {
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
  },
})

export const pickedFCompIdsState = atom<string[]>({
  key: 'pickedFCompIdsState',
  default: [],
})

// SELECTORS

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const FSchemaHistory = get(FSchemaHistoryState)
    const pickedFCompIds = get(pickedFCompIdsState)

    if (pickedFCompIds.length > 1) {
      return null
    }

    if (pickedFCompIds.length !== 0 && FSchemaHistory.data) {
      const pickedFComp = FSchemaHistory.data.comps[pickedFCompIds[0] || '']

      assertNotUndefined(pickedFComp)

      return pickedFComp
    }

    return null
  },
})

export const CSchemasIdsInSchemaState = selector({
  key: 'CSchemasIdsState',
  get: ({ get }) => {
    const FSchemaHistory = get(FSchemaHistoryState)

    if (FSchemaHistory) {
      const CSchemasIds = Object.values(FSchemaHistory.data.comps).map((comp) => comp.compSchemaId)

      return CSchemasIds
    }

    return []
  },
})

// SETTERS

export function setFSchema(schema: Schema) {
  return (FSchemaHistory: History<Schema>): History<Schema> => {
    return {
      prev: FSchemaHistory,
      next: null,
      data: schema,
    }
  }
}

export function setFSchemaComps(comps: Norm<Comp>) {
  return (FSchemaHistory: History<Schema>): History<Schema> => {
    return {
      prev: FSchemaHistory,
      next: null,
      data: { ...FSchemaHistory.data, comps },
    }
  }
}
