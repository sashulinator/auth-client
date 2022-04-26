import { Comp, NormComps } from '@/types/form-constructor'
import { remove, replace } from '@/utils/change-unmutable'

// returnsParentComps
export function removeCompsFromParent(parentId: string | number, indexes: number[], normComps: NormComps): Comp[] {
  const newSourceParentComps: Comp[] = []

  indexes.forEach((index) => {
    const sourceParentNormComp = normComps[parentId]

    if (!sourceParentNormComp && !sourceParentNormComp) {
      throw new Error('System error')
    }
    if (sourceParentNormComp?.children === undefined) {
      throw new Error('System error')
    }

    const currentCompId = sourceParentNormComp?.children?.[index] ?? ''
    const currentNormComp = normComps[currentCompId]

    if (!currentNormComp) {
      throw new Error('System error')
    }

    const newSourceParentCompChildren = remove(sourceParentNormComp?.children, index)

    let newSourceParentComp: Comp

    if (newSourceParentCompChildren.length === 0) {
      newSourceParentComp = remove(sourceParentNormComp, 'children')
    } else {
      newSourceParentComp = replace(sourceParentNormComp, 'children', newSourceParentCompChildren)
    }

    newSourceParentComps.push(newSourceParentComp)
  })

  return newSourceParentComps
}

// returnsParentComp
export function removeCompFromParent(parentId: string | number, index: number, normComps: NormComps): Comp {
  const comp = removeCompsFromParent(parentId, [index], normComps)[0]

  if (!comp) {
    throw new Error('System error')
  }

  return comp
}
