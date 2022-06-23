import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { walk } from './walk'

import { ROOT_ID } from '@/constants/common'
import { TreeAdditionalData } from '@/pages/form-constructor/tree-panel/types'
import { Catalog, Comp } from '@/shared/schema-drawer'

export function buildTree(tree: TreeData | undefined, entities: Catalog<Comp>, additionalData: TreeAdditionalData) {
  if (entities === undefined) {
    return undefined
  }

  const rootComp = entities[ROOT_ID]
  assertNotUndefined(rootComp)

  const items: Record<string, TreeItem> = {}

  walk(rootComp, entities, 'id', (entity, id) => {
    items[id] = {
      id: id,
      isExpanded: tree?.items[id]?.isExpanded ?? false,
      hasChildren: entity.children !== undefined,
      children: entity.children || [],
      data: { comp: entity, ...additionalData },
    }
  })

  return {
    rootId: ROOT_ID,
    items,
  }
}
