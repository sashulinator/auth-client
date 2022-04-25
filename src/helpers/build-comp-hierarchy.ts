import { findRootComponentIds } from './find-root-component-ids'

import { Comp, HierarchyComp, NormComps } from '@/types/form-constructor'

export function buildCompHierarchy(schemaComponents: Comp[], normComps: NormComps): HierarchyComp[] {
  const rootIds = findRootComponentIds(schemaComponents)

  function setComponentChild(id: string): HierarchyComp {
    const currentSchema = normComps[id] as Comp
    const children = currentSchema?.children?.map(setComponentChild)

    if (children?.length === 0 || children === undefined) {
      return currentSchema as HierarchyComp
    }

    return { ...currentSchema, children }
  }

  return rootIds.map(setComponentChild)
}
