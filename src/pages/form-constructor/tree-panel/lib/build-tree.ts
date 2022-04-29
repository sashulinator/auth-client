import { TreeData } from '@atlaskit/tree'

import { ROOT_COMP_ID } from '@/constants/common'
import { Norm } from '@/types/entities'
import { Comp } from '@/types/form-constructor'
import { mapObject } from '@/utils/map-object'

export function buildTree(comps: Norm<Comp>): TreeData {
  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    data: 'test',
    children: [ROOT_COMP_ID],
  }

  const treeItems = mapObject(comps, (comp) => {
    return {
      ...comp,
      id: comp.id,
      isExpanded: true,
      data: comp,
      children: comp.childCompIds || [],
      hasChildren: comp.childCompIds !== undefined,
    }
  })

  const items = { rootId: rootTreeItem, ...treeItems }

  return {
    rootId: rootTreeItem.id,
    items,
  }
}
