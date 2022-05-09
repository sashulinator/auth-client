import { assertNotUndefined } from '@savchenko91/schema-validator'

import { currentSchemaHistoryState } from './current-schema'
import { atom, selector } from 'recoil'

export const pickedFCompIdsState = atom<string[]>({
  key: 'pickedFCompIdsState',
  default: [],
})

// SELECTORS

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const currentSchemaHistory = get(currentSchemaHistoryState)
    const pickedFCompIds = get(pickedFCompIdsState)

    if (pickedFCompIds.length > 1) {
      return null
    }

    if (pickedFCompIds.length !== 0 && currentSchemaHistory.data) {
      const pickedFComp = currentSchemaHistory.data.comps[pickedFCompIds[0] || '']

      assertNotUndefined(pickedFComp)

      return pickedFComp
    }

    return null
  },
})

export const CSchemasIdsInSchemaState = selector({
  key: 'CSchemasIdsState',
  get: ({ get }) => {
    const currentSchemaHistory = get(currentSchemaHistoryState)

    if (currentSchemaHistory) {
      const CSchemasIds = Object.values(currentSchemaHistory.data.comps).map((comp) => comp.compSchemaId)

      return CSchemasIds
    }

    return []
  },
})
