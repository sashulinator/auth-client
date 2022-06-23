import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { walk } from './walk'

import { ROOT_ID } from '@/constants/common'
import { Entity } from '@/lib/entity-actions'
import { Catalog } from '@/shared/schema-drawer'

type AdditionalData = { searchQuery?: string } & Record<string, unknown>

export function buildTree(
  tree: TreeData | undefined,
  entities: Catalog<Entity>,
  additionalData: AdditionalData
): TreeData | undefined {
  if (entities === undefined) {
    return undefined
  }

  const rootComp = entities[ROOT_ID]
  assertNotUndefined(rootComp)

  return {
    rootId: ROOT_ID,
    items: additionalData.searchQuery
      ? buildTreeWithSearchQuery(rootComp, tree, entities, additionalData)
      : buildTreeDefault(rootComp, tree, entities, additionalData),
  }
}

// Private

function buildTreeWithSearchQuery(
  rootComp: Entity,
  tree: TreeData | undefined,
  entities: Catalog<Entity>,
  additionalData: AdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}
  const parentIds: Record<string, string> = {}

  walk(rootComp, entities, 'id', (entity, id, data, parentId) => {
    const isExpandedBeforeSearchQuery = tree?.items[id]?.data.isExpandedBeforeSearchQuery

    if (parentId !== undefined) {
      parentIds[id] = parentId
    }

    if (new RegExp(additionalData.searchQuery || '').test(id.toString())) {
      items[id] = {
        id: id,
        isExpanded: true,
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
    const parentComp = entities[parentId]

    if (parentItem === undefined) {
      items[parentId] = {
        id: parentId,
        isExpanded: true,
        hasChildren: true,
        children: [id],
        data: { comp: parentComp, ...additionalData },
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
  rootComp: Entity,
  tree: TreeData | undefined,
  entities: Catalog<Entity>,
  additionalData: AdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}

  walk(rootComp, entities, 'id', (entity, id) => {
    const isExpandedBeforeSearchQuery = tree?.items[id]?.data.isExpandedBeforeSearchQuery ?? false

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
