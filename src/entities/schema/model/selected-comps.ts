import { currentSchemaHistoryState } from './current-schema'
import { atom, selector } from 'recoil'

export const selectedCompIdsState = atom<string[]>({
  key: 'selectedCompIdsState',
  default: [],
})

// SELECTORS

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
