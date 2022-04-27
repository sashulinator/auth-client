import { TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree'
import { assertNotEmptyArray, assertNotUndefined } from '@savchenko91/schema-validator'

import { Norm } from '@/types/entities'
import { Comp } from '@/types/form-constructor'
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
    if (sourceParentNormComp?.children === undefined) {
      throw new Error('System error')
    }

    let newSourceParentCompChildren
    if (typeof indexOrId === 'number') {
      newSourceParentCompChildren = remove(sourceParentNormComp?.children, indexOrId)
    } else {
      const index = sourceParentNormComp?.children.findIndex((id) => id === indexOrId)
      newSourceParentCompChildren = remove(sourceParentNormComp?.children, index)
    }

    if (newSourceParentCompChildren.length === 0) {
      newParentComp = remove(sourceParentNormComp, 'children')
    } else {
      newParentComp = replace(sourceParentNormComp, 'children', newSourceParentCompChildren)
    }
  })

  // @ts-expect-error because ts does not see that indexes are not empty
  return newParentComp
}

/**
 * ! Returns parent comp
 */
export function removeCompFromParent(
  parentId: string | number,
  indexOrId: number | string,
  normComps: Norm<Comp>
): Comp {
  return removeCompsFromParent(parentId, [indexOrId], normComps)
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

    if (destinationParentNormComp?.children === undefined) {
      newParentComp = replace(destinationParentNormComp, 'children', [currentCompId])
      console.log('destinationParentComp.children', newParentComp)
    } else {
      const newDestinationParentCompChildren = insert(destinationParentNormComp.children, index, currentCompId)
      console.log('newDestinationParentCompChildren', index, currentCompId)

      newParentComp = replace(destinationParentNormComp, 'children', newDestinationParentCompChildren)
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
  if (to?.index === undefined) {
    throw new Error('А когда такое бывает? интересненько')
  }

  const fromParentComp = comps[from.parentId]
  const currentCompId = fromParentComp?.children?.[from.index]
  const toParentComp = comps[to.parentId]

  if (toParentComp === undefined) {
    throw new Error('А когда такое бывает? интересненько')
  }

  assertNotUndefined(currentCompId)
  assertNotUndefined(fromParentComp)

  const newFromParentComp = removeCompFromParent(from.parentId, currentCompId, from.index, comps)
  const newComps = replace(comps, fromParentComp.id, newFromParentComp)

  const newToParentComp = pasteCompToParent(to.parentId, currentCompId, to.index, newComps)
  const newNewComps = replace(newComps, toParentComp?.id, newToParentComp)

  return newNewComps
}

export function buildNewComp(componentName: string): Comp {
  if (componentName === 'TextInput') {
    return {
      id: Math.random().toString(),
      name: 'TextInput',
      componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
      componentName: 'TextField',
      // TODO строка initialPathPleaseChangeIt будет проверять валидатором
      // TODO такого значения быть не должно
      path: 'initialPathPleaseChangeIt' + Math.random().toString(),
      type: 'input',
    }
  }

  throw new Error('Such component does not exist')
}

export function addCompToParent(parentCompId: string, index: number, comp: Comp, comps: Norm<Comp>): Norm<Comp> {
  let newParentComp: Comp

  const destinationParentNormComp = comps[parentCompId]

  assertNotUndefined(destinationParentNormComp)

  if (destinationParentNormComp?.children === undefined) {
    newParentComp = replace(destinationParentNormComp, 'children', [comp.id])
  } else {
    const newDestinationParentCompChildren = insert(destinationParentNormComp.children, index, comp.id)
    newParentComp = replace(destinationParentNormComp, 'children', newDestinationParentCompChildren)
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
  const comp = Object.values(comps).find(({ children }) => children?.includes(id))

  assertNotUndefined(comp)

  return comp
}

export function findParentId(id: string, comps: Norm<Comp>): string {
  return findParent(id, comps).id
}
