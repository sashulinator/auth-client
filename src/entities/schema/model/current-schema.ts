import { atom } from 'recoil'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'
import { Catalog, Comp, CompSchema, CompSchemaType, LinkedComp } from '@/shared/schema-drawer'
import { DoublyLinkedList } from '@/types/common'

// STATES

export const currentSchemaHistoryState = atom<DoublyLinkedList<CompSchema>>({
  key: 'currentSchemaHistoryState',
  default: {
    prev: null,
    next: null,
    data: {
      // we cannot omit id so let's make it localSchema
      id: 'localSchema',
      componentName: null,
      title: 'Name',
      type: CompSchemaType.FORM,
      data: {
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

export function schemaSetter(schema: CompSchema) {
  return (currentSchemaHistory: DoublyLinkedList<CompSchema>): DoublyLinkedList<CompSchema> => {
    return {
      prev: currentSchemaHistory,
      next: null,
      data: schema,
    }
  }
}

export function updateCompsSetter(comps: Catalog<Comp | LinkedComp>) {
  return (currentSchemaHistory: DoublyLinkedList<CompSchema>): DoublyLinkedList<CompSchema> => {
    return {
      prev: currentSchemaHistory,
      next: null,
      data: { ...currentSchemaHistory.data, data: comps },
    }
  }
}

export function updateCompSetter(comp: Comp) {
  return (currentSchemaHistory: DoublyLinkedList<CompSchema>): DoublyLinkedList<CompSchema> => {
    const comps = replace(currentSchemaHistory.data.data, comp.id, comp)

    return {
      prev: currentSchemaHistory,
      next: null,
      data: { ...currentSchemaHistory.data, data: comps },
    }
  }
}

export function prevSetter(currentSchemaHistory: DoublyLinkedList<CompSchema>): DoublyLinkedList<CompSchema> {
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

export function nextSetter(currentSchemaHistory: DoublyLinkedList<CompSchema>): DoublyLinkedList<CompSchema> {
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
