import { assertNotUndefined } from '@savchenko91/schema-validator'

import { currentSchemaHistoryState } from './current-schema'
import { atom, selector } from 'recoil'

export const selectedCompIdsState = atom<string[]>({
  key: 'selectedCompIdsState',
  default: [],
})

// SELECTORS

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const currentSchemaHistory = get(currentSchemaHistoryState)
    const selectedCompIds = get(selectedCompIdsState)

    if (selectedCompIds.length > 1) {
      return null
    }

    if (selectedCompIds.length !== 0 && currentSchemaHistory.data) {
      const pickedFComp = currentSchemaHistory.data.comps[selectedCompIds[0] || '']

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
