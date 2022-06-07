import { Comp, Norm, Schema, SchemaType } from '../schema-drawer/model/types'
import { atom } from 'recoil'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'
import { DoublyLinkedList } from '@/types/common'

// STATES

export const currentSchemaHistoryState = atom<DoublyLinkedList<Schema>>({
  key: 'currentSchemaHistoryState',
  default: {
    prev: null,
    next: null,
    data: {
      // we cannot omit id so let's make it localSchema
      id: 'localSchema',
      componentName: null,
      title: 'Name',
      type: SchemaType.FORM,
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

export function schemaSetter(schema: Schema) {
  return (currentSchemaHistory: DoublyLinkedList<Schema>): DoublyLinkedList<Schema> => {
    return {
      prev: currentSchemaHistory,
      next: null,
      data: schema,
    }
  }
}

export function updateCompsSetter(comps: Norm<Comp>) {
  return (currentSchemaHistory: DoublyLinkedList<Schema>): DoublyLinkedList<Schema> => {
    return {
      prev: currentSchemaHistory,
      next: null,
      data: { ...currentSchemaHistory.data, comps },
    }
  }
}

export function updateCompSetter(comp: Comp) {
  return (currentSchemaHistory: DoublyLinkedList<Schema>): DoublyLinkedList<Schema> => {
    const comps = replace(currentSchemaHistory.data.comps, comp.id, comp)

    return {
      prev: currentSchemaHistory,
      next: null,
      data: { ...currentSchemaHistory.data, comps },
    }
  }
}

export function prevSetter(currentSchemaHistory: DoublyLinkedList<Schema>): DoublyLinkedList<Schema> {
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

export function nextSetter(currentSchemaHistory: DoublyLinkedList<Schema>): DoublyLinkedList<Schema> {
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
