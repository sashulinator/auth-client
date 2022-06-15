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

  const { searchQuery } = additionalData

  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    children: [ROOT_ID],
  }

  let allBranches: Record<string, TreeItem & { parentId?: string }> = {}
  let queriedBranches: Record<string, TreeItem> = {}
  const parentIds: string[] = []

  buildBranchesFromComps(ROOT_ID)

  function buildBranchesFromComps(id: string, parentId?: string) {
    const comp = comps?.[id]
    assertNotUndefined(comp)

    const currentTreeItem = currentTree?.items[id]

    const treeItem: TreeItem = {
      ...comp,
      id: comp.id,
      isExpanded: currentTreeItem?.isExpanded ?? true,
      data: { comp, ...additionalData },
      children: comp.children || [],
      hasChildren: comp.children !== undefined,
    }

    if (!searchQuery) {
      queriedBranches = { ...queriedBranches, [id]: { ...treeItem } }
    } else {
      allBranches = { ...allBranches, [id]: { ...treeItem, parentId } }

      if (comp.title.match(searchQuery)) {
        queriedBranches = { ...queriedBranches, [id]: { ...treeItem } }
        addParentsToQueriedBranches(parentId)
      }
    }

    if (comp.children) {
      for (let index = 0; index < comp.children.length; index++) {
        buildBranchesFromComps(comp.children[index] as string, comp.id)
      }
    }

    if (searchQuery && comp.title.match(searchQuery)) {
      queriedBranches = { ...queriedBranches, [id]: { ...treeItem, children: [] } }
      parentId && parentIds.push(parentId)
    }
  }

  function addParentsToQueriedBranches(id?: string | number) {
    if (id === undefined) {
      return
    }
    const treeItem = allBranches[id]
    assertNotUndefined(treeItem)
    queriedBranches = {
      ...queriedBranches,
      [id]: { ...treeItem, children: treeItem.children.filter((id) => queriedBranches[id]) },
    }
    addParentsToQueriedBranches(treeItem.parentId)
  }

  parentIds.forEach(addParentsToQueriedBranches)

  const items = { rootId: rootTreeItem, ...queriedBranches }

  return {
    rootId: ROOT_ID,
    items,
  }
}
