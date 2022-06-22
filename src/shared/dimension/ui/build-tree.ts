import { TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ROOT_ID } from '@/constants/common'
import { mutateObject } from '@/lib/mutate-object'
import { Catalog, Comp } from '@/shared/schema-drawer'

export function buildTree(allComps: Catalog<Comp> | undefined) {
  if (allComps === undefined) {
    return undefined
  }

  const { [ROOT_ID]: rootComp, ...comps } = allComps
  assertNotUndefined(rootComp)
  const dimensionTreeId = rootComp.children?.[0]

  if (dimensionTreeId === undefined) {
    return undefined
  }

  const items = mutateObject<TreeItem, Catalog<Comp>>(comps)((comp) => {
    return {
      ...comp,
      id: comp.id,
      isExpanded: true,
      hasChildren: comp.children !== undefined,
      children: comp.children || [],
      data: { comp },
    }
  })

  return {
    rootId: dimensionTreeId,
    items,
  }
}
