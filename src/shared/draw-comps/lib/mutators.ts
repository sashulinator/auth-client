import { TreeSourcePosition } from '@atlaskit/tree'
import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import uuid from 'uuid-random'

import { Comp, Norm, Schema } from '@/common/types'
import { ROOT_COMP_ID } from '@/constants/common'
import { insert, remove, replace, replaceById } from '@/lib/change-unmutable'

export function createNewComp(schema: Schema): Comp {
  schema

  return {
    id: uuid(),
    compSchemaId: schema.id,
    path: 'DEFAULT_PATH',
    name: schema.name,
  }
}

// TODO в будущем будет убирать еще и байндинги
export function copyComp(comp: Comp): Comp {
  return { ...comp, id: uuid() }
}

export function copyComps(comps: Norm<Comp>): Norm<Comp> {
  return Object.values(comps).reduce<Norm<Comp>>((acc, comp) => {
    const newComp = copyComp(comp)
    acc[newComp.id] = newComp
    return acc
  }, {})
}

export function findParent(id: string, comps: Norm<Comp>): Comp {
  const comp = Object.values(comps).find(({ childCompIds }) => childCompIds?.includes(id))

  assertNotUndefined(comp)

  return comp
}

export function findCompPosition(compId: string, comps: Norm<Comp>): TreeSourcePosition {
  const parentComp = findParent(compId, comps)

  if (compId === ROOT_COMP_ID) {
    return { index: 0, parentId: parentComp.id }
  }
  const index = parentComp.childCompIds?.indexOf(compId)

  assertNotUndefined(index)

  return {
    index,
    parentId: parentComp.id,
  }
}

export function findComp(id: string, comps: Norm<Comp>): Comp {
  const comp = comps[id]
  assertNotUndefined(comp)
  return comp
}
export function findComps(ids: string[], comps: Norm<Comp>): Norm<Comp> {
  return ids.reduce<Norm<Comp>>((acc, id) => {
    acc[id] = findComp(id, comps)
    return acc
  }, {})
}

// CHILD ID

/**
 * Returns parent comp
 */
export function removeChildId(comp: Comp, childIdOrIndex: string | number): Comp {
  assertNotUndefined(comp.childCompIds)

  const index = isString(childIdOrIndex) ? comp.childCompIds.indexOf(childIdOrIndex) : childIdOrIndex

  if (index === -1) {
    throw new Error('child does not exist in comp')
  }

  const newChildCompIds = remove(comp.childCompIds, index)

  // Поле childCompIds не должно существовать если дети отсутствуют
  if (newChildCompIds.length === 0) {
    return remove(comp, 'childCompIds')
  }

  return replace(comp, 'childCompIds', newChildCompIds)
}

export function addChildId(parentComp: Comp, compId: string, index: number): Comp {
  if (index < 0) {
    throw new Error('Index cannot be less than 0')
  }

  const childLength = parentComp?.childCompIds?.length ?? 0

  if (index > childLength) {
    throw new Error(`Index cannot be more than ${childLength}`)
  }

  const parentClone = { ...parentComp, childCompIds: parentComp?.childCompIds ?? [] }

  const newChildCompIds = insert(parentClone.childCompIds, index, compId)
  const newParentComp = replace(parentClone, 'childCompIds', newChildCompIds)

  return newParentComp
}

// COMPS

export function removeComp(compId: string, comps: Norm<Comp>): Norm<Comp> {
  const parentComp = findParent(compId, comps)
  // Remove from comps
  const changedComps = remove(comps, compId)
  // Remove from parent
  const changedParentComp = removeChildId(parentComp, compId)

  return replaceById(changedParentComp, changedComps)
}

export function addComp(comp: Comp, newParentId: string, newIndex: number, comps: Norm<Comp>): Norm<Comp> {
  const parentComp = findComp(newParentId, comps)
  // Add childId to parent

  const newParentComp = addChildId(parentComp, comp.id, newIndex)
  // Add parent to comps
  const compsWithNewParentComp = replaceById(newParentComp, comps)

  const newComps = insert(compsWithNewParentComp, comp.id, comp)

  return newComps
}

export function moveComp(comp: Comp, toParentId: string, newIndex: number, comps: Norm<Comp>): Norm<Comp> {
  const compsWithoutMovingComp = removeComp(comp.id, comps)
  const compsWithMovingComp = addComp(comp, toParentId, newIndex, compsWithoutMovingComp)

  return compsWithMovingComp
}
