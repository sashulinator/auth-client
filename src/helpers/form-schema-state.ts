import { TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree'

import { Comp, NormComps } from '@/types/form-constructor'
import { insert, remove, replace } from '@/utils/change-unmutable'
import { normalizeWithIndex } from '@/utils/normalize'

// returnsParentComps
export function removeCompsFromParent(
  parentId: string | number,
  currentCompId: string,
  indexes: number[],
  normComps: NormComps
): Comp {
  let newParentComp: Comp

  if (indexes.length === 0) {
    throw new Error('System error')
  }

  indexes.forEach((index) => {
    const sourceParentNormComp = normComps[parentId]

    if (!sourceParentNormComp && !sourceParentNormComp) {
      throw new Error('System error')
    }
    if (sourceParentNormComp?.children === undefined) {
      throw new Error('System error')
    }

    const currentNormComp = normComps[currentCompId]

    if (!currentNormComp) {
      throw new Error('System error')
    }

    const newSourceParentCompChildren = remove(sourceParentNormComp?.children, index)

    if (newSourceParentCompChildren.length === 0) {
      newParentComp = remove(sourceParentNormComp, 'children')
    } else {
      newParentComp = replace(sourceParentNormComp, 'children', newSourceParentCompChildren)
    }
  })

  // @ts-expect-error because ts does not see that indexes are not empty
  return newParentComp
}

// returnsParentComp
export function removeCompFromParent(
  parentId: string | number,
  currentCompId: string,
  index: number,
  normComps: NormComps
): Comp {
  return removeCompsFromParent(parentId, currentCompId, [index], normComps)
}

export function addCompsToParent(
  parentId: string | number,
  currentCompId: string,
  indexes: number[],
  normComps: NormComps
): Comp {
  let newParentComp: Comp

  if (indexes.length === 0) {
    throw new Error('System error')
  }

  indexes.forEach((index) => {
    const destinationParentNormComp = normComps[parentId]

    if (!destinationParentNormComp) {
      throw new Error('System error')
    }

    if (destinationParentNormComp?.children === undefined) {
      newParentComp = replace(destinationParentNormComp, 'children', [currentCompId])
      console.log('destinationParentComp.children', newParentComp)
    } else {
      const newDestinationParentCompChildren = insert(destinationParentNormComp.children, index, currentCompId)
      console.log('newDestinationParentCompChildren', index, currentCompId)

      newParentComp = replace(destinationParentNormComp, 'children', newDestinationParentCompChildren)
    }
  })

  // @ts-expect-error because ts does not see that indexes are not empty
  return newParentComp
}

export function addCompToParent(
  parentId: string | number,
  currentCompId: string,
  index: number,
  normComps: NormComps
): Comp {
  return addCompsToParent(parentId, currentCompId, [index], normComps)
}

export function moveComps(
  comps: Comp[],
  normComps: NormComps,
  from: TreeSourcePosition,
  to?: TreeDestinationPosition
): Comp[] {
  if (to?.index === undefined) {
    return comps
  }

  const fromParentNormComp = normComps[from.parentId]
  const currentCompId = fromParentNormComp?.children?.[from.index] ?? ''

  if (currentCompId === undefined) {
    throw new Error('Systed error')
  }

  const newFromParentComp = removeCompFromParent(from.parentId, currentCompId, from.index, normComps)
  const newFromSchema = replace(comps, fromParentNormComp?.indexInArray ?? 0, newFromParentComp)
  const newNormFormSchema = normalizeWithIndex(newFromSchema)

  const toParentNormComp = normComps[to.parentId]
  const newToParentComp = addCompToParent(to.parentId, currentCompId, to.index, newNormFormSchema)
  const newSchema = replace(newFromSchema, toParentNormComp?.indexInArray ?? 0, newToParentComp)

  return newSchema
}
