import { atom } from 'recoil'

import { Comp, FormType, History, Norm, Schema } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'

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

export function upsertCurrentSchemaComp(comp: Comp) {
  return (currentSchemaHistory: History<Schema>): History<Schema> => {
    const comps = replace(currentSchemaHistory.data.comps, comp.id, comp)

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
