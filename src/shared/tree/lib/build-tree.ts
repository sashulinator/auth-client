import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { walk } from './walk'

import { ROOT_ID } from '@/constants/common'
import { TreeAdditionalData } from '@/pages/form-constructor/tree-panel/types'
import { Catalog, Comp } from '@/shared/schema-drawer'

export function buildTree(tree: TreeData | undefined, comps: Catalog<Comp>, additionalData: TreeAdditionalData) {
  if (comps === undefined) {
    return undefined
  }

  const rootComp = comps[ROOT_ID]
  assertNotUndefined(rootComp)

  const items: Record<string, TreeItem> = {}

  walk(rootComp, comps, 'id', (comp) => {
    items[comp.id] = {
      ...comp,
      id: comp.id,
      isExpanded: tree?.items[comp.id]?.isExpanded ?? false,
      hasChildren: comp.children !== undefined,
      children: comp.children || [],
      data: { comp, ...additionalData },
    }
  })

  return {
    rootId: ROOT_ID,
    items,
  }
}
