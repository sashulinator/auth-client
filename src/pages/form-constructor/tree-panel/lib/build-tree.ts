import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { TreeItemAdditionalData } from '../types'

import { ROOT_ID } from '@/constants/common'
import { Catalog, Comp } from '@/shared/schema-drawer'

export function buildTree(
  currentTree: TreeData | undefined,
  comps: Catalog<Comp> | undefined,
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

  const treeItems = buildBranchesFromComps({}, ROOT_ID)

  function buildBranchesFromComps(
    acc: Record<string, TreeItem> | undefined,
    id: string
  ): Record<string, TreeItem> | undefined {
    const comp = comps?.[id]
    assertNotUndefined(comp)

    const childrenTreeItems = comp?.children?.reduce(buildBranchesFromComps, acc)
    const currentTreeItem = currentTree?.items[id]

    const treeItem = {
      ...comp,
      id: comp.id,
      isExpanded: currentTreeItem?.isExpanded ?? true,
      data: { comp, ...additionalData },
      children: comp.children || [],
      hasChildren: comp.children !== undefined,
    }

    return { ...childrenTreeItems, ...acc, [id]: treeItem }
  }

  const items = { rootId: rootTreeItem, ...treeItems }

  return {
    rootId: ROOT_ID,
    items,
  }
}
