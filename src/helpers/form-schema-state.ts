import { TreeDestinationPosition, TreeSourcePosition } from '@atlaskit/tree'
import { assertNotEmptyArray, assertNotUndefined } from '@savchenko91/schema-validator'

import { Comp, NormComps } from '@/types/form-constructor'
import { insert, remove, replace } from '@/utils/change-unmutable'
import { normalizeWithIndex } from '@/utils/normalize'

/**
 * ! Returns parent comp
 */
export function removeCompsFromParent(
  parentId: string | number,
  currentCompId: string,
  indexesOrIds: (number | string)[],
  normComps: NormComps
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

    const currentNormComp = normComps[currentCompId]

    if (!currentNormComp) {
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
  currentCompId: string,
  indexOrId: number | string,
  normComps: NormComps
): Comp {
  return removeCompsFromParent(parentId, currentCompId, [indexOrId], normComps)
}

export function pasteCompsToParent(
  parentId: string | number,
  currentCompId: string,
  indexes: number[],
  normComps: NormComps
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
  normComps: NormComps
): Comp {
  return pasteCompsToParent(parentId, currentCompId, [index], normComps)
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
  const toParentNormComp = normComps[to.parentId]

  if (toParentNormComp === undefined) {
    return comps
  }

  assertNotUndefined(currentCompId)

  const newFromParentComp = removeCompFromParent(from.parentId, currentCompId, from.index, normComps)
  const newFromSchema = replace(comps, fromParentNormComp?.indexInArray ?? 0, newFromParentComp)
  const newNormFormSchema = normalizeWithIndex(newFromSchema)

  const newToParentComp = pasteCompToParent(to.parentId, currentCompId, to.index, newNormFormSchema)
  const newSchema = replace(newFromSchema, toParentNormComp?.indexInArray ?? 0, newToParentComp)

  return newSchema
}

// TODO должен искать в Comp и NormComp
export function findParent(id: string, comps: Comp[]): Comp {
  const comp = comps.find(({ children }) => children?.includes(id))

  assertNotUndefined(comp)

  return comp
}

// TODO должен искать в Comp и NormComp
export function findParentId(id: string, comps: Comp[]): string {
  return findParent(id, comps).id
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

export function addCompToParent(parentId: string, index: number, comp: Comp, normComps: NormComps): Comp[] {
  let newParentComp: Comp

  const destinationParentNormComp = normComps[parentId]

  assertNotUndefined(destinationParentNormComp)

  if (destinationParentNormComp?.children === undefined) {
    newParentComp = replace(destinationParentNormComp, 'children', [comp.id])
  } else {
    const newDestinationParentCompChildren = insert(destinationParentNormComp.children, index, comp.id)
    newParentComp = replace(destinationParentNormComp, 'children', newDestinationParentCompChildren)
  }

  // TODO написать функцию по денормализации
  const denormalizedComps = Object.values(normComps).reduce<Comp[]>((acc, normComp) => {
    if (newParentComp.id === normComp.id) {
      acc.push(newParentComp)
    } else {
      acc.push({ ...normComp })
    }
    return acc
  }, [])

  denormalizedComps.push(comp)

  return denormalizedComps
}
