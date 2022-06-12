import { TreeData, TreeItem } from '@atlaskit/tree'

import { TreeItemAdditionalData } from '../types'

import { ROOT_ID } from '@/constants/common'
import { mutateObject } from '@/lib/mutate-object'
import { Comp, Norm } from '@/shared/schema-drawer'

export function buildTree(
  currentTree: TreeData | undefined,
  comps: Norm<Comp> | undefined,
  additionalData: TreeItemAdditionalData
): TreeData | undefined {
  if (comps === undefined) {
    return undefined
  }

  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    children: [ROOT_ID],
  }

  const treeItems = mutateObject(comps)(
    (comp): TreeItem => {
      const currentTreeItem = currentTree?.items[comp.id]

      return {
        ...comp,
        id: comp.id,
        isExpanded: currentTreeItem?.isExpanded ?? false,
        data: { comp, ...additionalData },
        children: comp.children || [],
        hasChildren: comp.children !== undefined,
      }
    }
  )

  const items = { rootId: rootTreeItem, ...treeItems }

  return {
    rootId: ROOT_ID,
    items,
  }
}
