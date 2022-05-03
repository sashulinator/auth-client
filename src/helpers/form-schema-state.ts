import { TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree'
import { assertNotEmptyArray, assertNotUndefined } from '@savchenko91/schema-validator'

import uuid from 'uuid-random'

import { Comp, Norm, Schema } from '@/common/types'
import { insert, remove, replace } from '@/utils/change-unmutable'

/**
 * ! Returns parent comp
 */
export function removeCompsFromParent(
  parentId: string | number,
  indexesOrIds: (number | string)[],
  normComps: Norm<Comp>
): Comp {
  let newParentComp: Comp

  if (indexesOrIds.length === 0) {
    throw new Error('System error')
  }

  indexesOrIds.forEach((indexOrId) => {
    const sourceParentNormComp = normComps[parentId]

    if (!sourceParentNormComp && !sourceParentNormComp) {
      throw new Error('System error')
    }
    if (sourceParentNormComp?.childCompIds === undefined) {
      throw new Error('System error')
    }

    let newSourceParentCompChildren
    if (typeof indexOrId === 'number') {
      newSourceParentCompChildren = remove(sourceParentNormComp?.childCompIds, indexOrId)
    } else {
      const index = sourceParentNormComp?.childCompIds.findIndex((id) => id === indexOrId)
      newSourceParentCompChildren = remove(sourceParentNormComp?.childCompIds, index)
    }

    if (newSourceParentCompChildren.length === 0) {
      newParentComp = remove(sourceParentNormComp, 'childCompIds')
    } else {
      newParentComp = replace(sourceParentNormComp, 'childCompIds', newSourceParentCompChildren)
    }
  })

  // @ts-expect-error because ts does not see that indexes are not empty
  return newParentComp
}

/**
 * ! Returns parent comp
 */
export function removeCompFromParent(parentId: string | number, indexOrId: number | string, comps: Norm<Comp>): Comp {
  return removeCompsFromParent(parentId, [indexOrId], comps)
}

export function pasteCompsToParent(
  parentId: string | number,
  currentCompId: string,
  indexes: number[],
  normComps: Norm<Comp>
): Comp {
  let newParentComp: Comp

  assertNotEmptyArray<number>(indexes)

  indexes.forEach((index) => {
    const destinationParentNormComp = normComps[parentId]

    if (!destinationParentNormComp) {
      throw new Error('System error')
    }

    if (destinationParentNormComp?.childCompIds === undefined) {
      newParentComp = replace(destinationParentNormComp, 'childCompIds', [currentCompId])
    } else {
      const newDestinationParentCompChildren = insert(destinationParentNormComp.childCompIds, index, currentCompId)
      newParentComp = replace(destinationParentNormComp, 'childCompIds', newDestinationParentCompChildren)
    }
  })

  // @ts-expect-error because ts does not see assertNotEmptyArray
  return newParentComp
}

export function pasteCompToParent(
  parentId: string | number,
  currentCompId: string,
  index: number,
  normComps: Norm<Comp>
): Comp {
  return pasteCompsToParent(parentId, currentCompId, [index], normComps)
}

export function moveComps(comps: Norm<Comp>, from: TreeSourcePosition, to?: TreeDestinationPosition): Norm<Comp> {
  if (to === undefined) {
    return comps
  }

  const fromParentComp = comps[from.parentId]
  const currentCompId = fromParentComp?.childCompIds?.[from.index]
  const toParentComp = comps[to.parentId]

  if (toParentComp === undefined) {
    return comps
  }

  assertNotUndefined(currentCompId)
  assertNotUndefined(fromParentComp)

  const newFromParentComp = removeCompFromParent(from.parentId, currentCompId, comps)
  const newComps = replace(comps, fromParentComp.id, newFromParentComp)

  const newToParentComp = pasteCompToParent(to.parentId, currentCompId, to.index || 0, newComps)
  const newNewComps = replace(newComps, toParentComp?.id, newToParentComp)

  return newNewComps
}

export function createNewComp(schema: Schema): Comp {
  schema

  return {
    id: uuid(),
    compSchemaId: schema.id,
    path: 'DEFAULT_PATH',
    name: schema.name,
  }
}

export function addCompToParent(parentCompId: string, index: number, comp: Comp, comps: Norm<Comp>): Norm<Comp> {
  let newParentComp: Comp

  const destinationParentNormComp = comps[parentCompId]

  assertNotUndefined(destinationParentNormComp)

  if (destinationParentNormComp?.childCompIds === undefined) {
    newParentComp = replace(destinationParentNormComp, 'childCompIds', [comp.id])
  } else {
    const newDestinationParentCompChildren = insert(destinationParentNormComp.childCompIds, index, comp.id)
    newParentComp = replace(destinationParentNormComp, 'childCompIds', newDestinationParentCompChildren)
  }

  const newComps = insert(comps, parentCompId, newParentComp)
  const newNewComps = insert(newComps, comp.id, comp)

  return newNewComps
}

export function removeComp(compId: string, comps: Norm<Comp>) {
  const parentComp = findParent(compId, comps)

  const newParentComp = removeCompFromParent(findParentId(compId, comps), compId, comps)

  const newComps = replace(comps, parentComp.id, newParentComp)

  const newNewComps = remove(newComps, compId)

  return newNewComps
}

export function findParent(id: string, comps: Norm<Comp>): Comp {
  const comp = Object.values(comps).find(({ childCompIds }) => childCompIds?.includes(id))

  assertNotUndefined(comp)

  return comp
}

export function findParentId(id: string, comps: Norm<Comp>): string {
  return findParent(id, comps).id
}
