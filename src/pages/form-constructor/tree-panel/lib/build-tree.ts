import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ROOT_ID } from '@/constants/common'
import { TreeAdditionalData } from '@/pages/form-constructor/tree-panel/types'
import { Catalog, Comp } from '@/shared/schema-drawer'
import { walk } from '@/shared/tree'

export function buildTree(
  tree: TreeData | undefined,
  entities: Catalog<Comp>,
  additionalData: TreeAdditionalData
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
  rootComp: Comp,
  tree: TreeData | undefined,
  entities: Catalog<Comp>,
  additionalData: TreeAdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}

  walk(rootComp, entities, 'id', (comp, id) => {
    const isExpandedBeforeSearchQuery = tree?.items[id]?.data.isExpandedBeforeSearchQuery

    if (new RegExp(additionalData.searchQuery || '').test(id.toString())) {
      items[id] = {
        id,
        isExpanded: true,
        hasChildren: comp.children !== undefined,
        children: [],
        data: { comp, isExpandedBeforeSearchQuery, ...additionalData },
      }
    }
  })

  return items
}

function buildTreeDefault(
  rootComp: Comp,
  tree: TreeData | undefined,
  entities: Catalog<Comp>,
  additionalData: TreeAdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}

  walk(rootComp, entities, 'id', (comp, id) => {
    const isExpandedBeforeSearchQuery = tree?.items[id]?.data.isExpandedBeforeSearchQuery ?? false

    items[id] = {
      id,
      isExpanded: isExpandedBeforeSearchQuery,
      hasChildren: comp.children !== undefined,
      children: comp.children || [],
      data: { comp, isExpandedBeforeSearchQuery, ...additionalData },
    }
  })

  return items
}
