import { TreeData, TreeItem } from '@atlaskit/tree'

import { TreeItemAdditionalData } from '../types'

import { Comp, Norm } from '@/common/types'
import { ROOT_COMP_ID } from '@/constants/common'
import { mapObject } from '@/lib/map-object'

export function buildTree(comps: Norm<Comp> | undefined, additionalData: TreeItemAdditionalData): TreeData | undefined {
  if (comps === undefined) {
    return undefined
  }

  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    children: [ROOT_COMP_ID],
  }

  const treeItems = mapObject(
    comps,
    (comp): TreeItem => {
      return {
        ...comp,
        id: comp.id,
        isExpanded: true,
        data: { comp, ...additionalData },
        children: comp.children || [],
        hasChildren: comp.children !== undefined,
      }
    }
  )

  const items = { rootId: rootTreeItem, ...treeItems }

  return {
    rootId: rootTreeItem.id,
    items,
  }
}
