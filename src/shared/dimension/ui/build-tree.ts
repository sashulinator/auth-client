import { TreeItem } from '@atlaskit/tree'

import { ROOT_ID } from '@/constants/common'
import { mutateObject } from '@/lib/mutate-object'
import { Catalog, Comp } from '@/shared/schema-drawer'

export function buildTree(comps: Catalog<Comp> | undefined) {
  if (comps === undefined) {
    return undefined
  }

  const items = mutateObject<TreeItem, Catalog<Comp>>(comps)((comp) => {
    return {
      ...comp,
      id: comp.id,
      isExpanded: false,
      hasChildren: comp.children !== undefined,
      children: comp.children || [],
      data: { comp },
    }
  })

  return {
    rootId: ROOT_ID,
    items,
  }
}
