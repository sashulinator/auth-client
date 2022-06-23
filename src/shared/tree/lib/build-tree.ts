import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ROOT_ID } from '@/constants/common'
import { Entity } from '@/lib/entity-actions'
import { Catalog, CompSchemaType } from '@/shared/schema-drawer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AddiotioanlData extends Record<string, any> {
  search?: {
    query: string
    keys: string[]
  }
}

export function buildTree<TAdditionalData extends AddiotioanlData>(
  currentTree: TreeData | undefined,
  entities: Catalog<Entity> | undefined,
  schemaType: CompSchemaType,
  additionalData: TAdditionalData
): TreeData | undefined {
  if (entities === undefined) {
    return undefined
  }

  const searchQuery = additionalData.search?.query
  const searchKeys = additionalData.search?.keys

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
    const entity = entities?.[id]
    assertNotUndefined(entity)

    const currentTreeItem = currentTree?.items[id]

    const treeItem: TreeItem = {
      ...entity,
      id: entity.id,
      isExpanded: currentTreeItem?.isExpanded ?? schemaType !== CompSchemaType.FORM_DIMENSION,
      data: { comp: entity, ...additionalData },
      children: entity.children || [],
      hasChildren: entity.children !== undefined,
    }

    if (!searchQuery) {
      queriedBranches = { ...queriedBranches, [id]: { ...treeItem } }
    } else {
      allBranches = { ...allBranches, [id]: { ...treeItem, parentId } }

      if (!searchKeys?.length) {
        throw new Error('Search query was provided but not keys to search by')
      }

      for (let index = 0; index < searchKeys.length; index++) {
        const key = searchKeys[index] as string

        if (entity[key]?.match(searchQuery)) {
          queriedBranches = { ...queriedBranches, [id]: { ...treeItem } }
          addParentsToQueriedBranches(parentId)
        }
      }
    }

    if (entity.children) {
      for (let index = 0; index < entity.children.length; index++) {
        buildBranchesFromComps(entity.children[index] as string, entity.id)
      }
    }

    if (searchQuery && entity.title.match(searchQuery)) {
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
