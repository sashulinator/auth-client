import { Norm } from '@/types/entities'
import { Comp } from '@/types/form-constructor'

export function findRootComponentIds(comps: Norm<Comp>): string[] {
  let notParents: string[] = []

  return Object.values(comps).reduce<string[]>((acc, schemaComponent) => {
    if (schemaComponent.children) {
      notParents = [...notParents, ...schemaComponent.children]
    }

    if (!notParents.includes(schemaComponent.id)) {
      acc.push(schemaComponent.id)
    }

    return acc
  }, [])
}
