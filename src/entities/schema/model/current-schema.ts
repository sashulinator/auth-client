import { assertNotUndefined } from '@savchenko91/schema-validator'

import { atom, selector } from 'recoil'

import { Comp, FormType, History, Norm, Schema } from '@/common/types'
import { ROOT_ID } from '@/constants/common'

// STATES

export const currentSchemaHistoryState = atom<History<Schema>>({
  key: 'currentSchemaHistoryState',
  default: {
    prev: null,
    next: null,
    data: {
      // TODO Попробовать удалить id
      id: '',
      componentName: null,
      title: 'Name',
      type: FormType.FORM,
      comps: {
        [ROOT_ID]: {
          id: ROOT_ID,
          name: 'noname',
          compSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
          title: 'stackRoot',
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

// SETTERS

export function setFSchema(schema: Schema) {
  return (currentSchemaHistory: History<Schema>): History<Schema> => {
    return {
      prev: currentSchemaHistory,
      next: null,
      data: schema,
    }
  }
}

export function setFSchemaComps(comps: Norm<Comp>) {
  return (currentSchemaHistory: History<Schema>): History<Schema> => {
    return {
      prev: currentSchemaHistory,
      next: null,
      data: { ...currentSchemaHistory.data, comps },
    }
  }
}

export function setPrev(currentSchemaHistory: History<Schema>): History<Schema> {
  if (currentSchemaHistory.prev === null) {
    return currentSchemaHistory
  }

  const newState = {
    prev: currentSchemaHistory.prev.prev || null,
    next: currentSchemaHistory,
    data: currentSchemaHistory.prev.data,
  }

  return newState
}

export function setNext(currentSchemaHistory: History<Schema>): History<Schema> {
  if (currentSchemaHistory.next === null) {
    return currentSchemaHistory
  }

  const newState = {
    prev: currentSchemaHistory,
    next: currentSchemaHistory.next.next || null,
    data: currentSchemaHistory.next.data,
  }

  return newState
}
