import { TreeData, TreeItem } from '@atlaskit/tree'

import { ROOT_ID } from '@/constants/common'
import { mutateObject } from '@/lib/mutate-object'
import { TreeAdditionalData } from '@/pages/form-constructor/tree-panel/types'
import { Catalog, Comp } from '@/shared/schema-drawer'

export function buildTree(tree: TreeData | undefined, comps: Catalog<Comp>, additionalData: TreeAdditionalData) {
  if (comps === undefined) {
    return undefined
  }

  const items = mutateObject<TreeItem, Catalog<Comp>>(comps)((comp) => {
    return {
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
