import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { walk } from './walk'

import { ROOT_ID } from '@/constants/common'
import { Entity } from '@/lib/entity-actions'
import { Catalog } from '@/shared/schema-drawer'

type AdditionalData = {
  isInitialExpanded: boolean
  search?: {
    query?: string
    fieldNames: string[]
  }
} & Record<string, unknown>

export function buildTree(
  tree: TreeData | undefined,
  entities: Catalog<Entity> | undefined,
  additionalData: AdditionalData
): TreeData | undefined {
  if (entities === undefined) {
    return undefined
  }

  const rootEntity = entities[ROOT_ID]
  assertNotUndefined(rootEntity)

  return {
    rootId: ROOT_ID,
    items: additionalData.search?.query
      ? buildTreeWithSearchQuery(rootEntity, tree, entities, additionalData)
      : buildTreeDefault(rootEntity, tree, entities, additionalData),
  }
}

// Private

function buildTreeWithSearchQuery(
  rootEntity: Entity,
  tree: TreeData | undefined,
  entities: Catalog<Entity>,
  additionalData: AdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}
  const parentIds: Record<string, string> = {}

  walk(rootEntity, entities, 'id', (entity, id, data, parentId) => {
    const isExpandedBeforeSearchQuery = tree?.items[id]?.data.isExpandedBeforeSearchQuery

    if (parentId !== undefined) {
      parentIds[id] = parentId
    }

    const isFound = additionalData.search?.fieldNames.some((fieldName) => {
      return new RegExp(additionalData.search?.query || '', 'i').test(entity[fieldName])
    })

    if (isFound) {
      items[id] = {
        id: id,
        isExpanded: additionalData.isInitialExpanded,
        hasChildren: entity.children !== undefined,
        children: [],
        data: { entity, isExpandedBeforeSearchQuery, ...additionalData },
      }
    }
  })

  function addParents(id: string) {
    const parentId = parentIds[id]

    if (parentId === undefined) {
      return
    }

    const parentItem = items[parentId]
    const parentEntity = entities[parentId]

    if (parentItem === undefined) {
      items[parentId] = {
        id: parentId,
        isExpanded: true,
        hasChildren: true,
        children: [id],
        data: { entity: parentEntity, ...additionalData },
      }
    } else {
      parentItem.children = [...new Set([...parentItem.children, id])]
    }

    addParents(parentId)
  }

  Object.keys(items).forEach(addParents)

  return items
}

function buildTreeDefault(
  rootEntity: Entity,
  tree: TreeData | undefined,
  entities: Catalog<Entity>,
  additionalData: AdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}

  walk(rootEntity, entities, 'id', (entity, id) => {
    const isExpandedBeforeSearchQuery =
      tree?.items[id]?.data.isExpandedBeforeSearchQuery ?? additionalData.isInitialExpanded

    items[id] = {
      id,
      isExpanded: isExpandedBeforeSearchQuery,
      hasChildren: entity.children !== undefined,
      children: entity.children || [],
      data: { entity, isExpandedBeforeSearchQuery, ...additionalData },
    }
  })

  return items
}
