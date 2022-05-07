import { TreeSourcePosition } from '@atlaskit/tree'
import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import uniqid from 'uniqid'

import { Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'
import { insert, remove, replace, replaceById } from '@/lib/change-unmutable'

export interface Entity {
  id: string
  children?: string[]
}

export function copyEntity<T extends Entity>(entity: T): T {
  return { ...entity, id: uniqid() }
}

// TODO не проходится по детям и не заменяет в них id!
export function copyEntities<T extends Entity>(entities: Norm<T>): Norm<T> {
  return Object.values(entities).reduce<Norm<T>>((acc, entity) => {
    const newEntity = copyEntity(entity)
    acc[newEntity.id] = newEntity
    return acc
  }, {})
}

export function findParent<T extends Entity>(id: string, entities: Norm<T>): T {
  const entity = Object.values(entities).find(({ children }) => children?.includes(id))

  assertNotUndefined(entity)

  return entity
}

export function findEntityPosition<T extends Entity>(entityId: string, entities: Norm<T>): TreeSourcePosition {
  const parentEntity = findParent(entityId, entities)

  if (entityId === ROOT_ID) {
    return { index: 0, parentId: parentEntity.id }
  }
  const index = parentEntity.children?.indexOf(entityId)

  assertNotUndefined(index)

  return {
    index,
    parentId: parentEntity.id,
  }
}

export function findEntity<T extends Entity>(id: string, entities: Norm<T>): T {
  const entity = entities[id]
  assertNotUndefined(entity)
  return entity
}
export function findEntities<T extends Entity>(ids: string[], entities: Norm<T>): Norm<T> {
  return ids.reduce<Norm<T>>((acc, id) => {
    acc[id] = findEntity(id, entities)
    return acc
  }, {})
}

// CHILD ID

/**
 * Returns parent entity
 */
export function removeChildId<T extends Entity>(entity: T, childIdOrIndex: string | number): T {
  assertNotUndefined(entity.children)

  const index = isString(childIdOrIndex) ? entity.children.indexOf(childIdOrIndex) : childIdOrIndex

  if (index === -1) {
    throw new Error('child does not exist in entity')
  }

  const newChildren = remove(entity.children, index)

  // Поле children не должно существовать если дети отсутствуют
  if (newChildren.length === 0) {
    return remove(entity, 'children')
  }

  return replace(entity, 'children', newChildren)
}

export function addChildId<T extends Entity>(parententity: T, entityId: string, index: number): T {
  if (index < 0) {
    throw new Error('Index cannot be less than 0')
  }

  const childLength = parententity?.children?.length ?? 0

  if (index > childLength) {
    throw new Error(`Index cannot be more than ${childLength}`)
  }

  const parentClone = { ...parententity, children: parententity?.children ?? [] }

  const newChildren = insert(parentClone.children, index, entityId)
  const newParententity = replace(parentClone, 'children', newChildren)

  return newParententity
}

// entities

export function removeEntity<T extends Entity>(entityId: string, entities: Norm<T>): Norm<T> {
  const parentEntity = findParent(entityId, entities)
  // Remove from entities
  const newEntities = remove(entities, entityId)
  // Remove from parent
  const newParentEntity = removeChildId(parentEntity, entityId)

  return replaceById(newParentEntity, newEntities)
}

export function addEntity<T extends Entity>(
  entity: T,
  newParentId: string,
  newIndex: number,
  entities: Norm<T>
): Norm<T> {
  const parentEntity = findEntity(newParentId, entities)
  // Add childId to parent

  const newParententity = addChildId(parentEntity, entity.id, newIndex)
  // Add parent to entities
  const entitiesWithNewParententity = replaceById(newParententity, entities)

  const newEntities = insert(entitiesWithNewParententity, entity.id, entity)

  return newEntities
}

export function moveEntity<T extends Entity>(
  entity: T,
  toParentId: string,
  newIndex: number,
  entities: Norm<T>
): Norm<T> {
  const entitiesWithoutMovingentity = removeEntity(entity.id, entities)
  const entitiesWithMovingentity = addEntity(entity, toParentId, newIndex, entitiesWithoutMovingentity)

  return entitiesWithMovingentity
}
