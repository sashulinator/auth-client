import { SchemaComponent } from '@/types/entities'

export function findRootComponentIds(schema: SchemaComponent[]): string[] {
  let notParents: string[] = []

  return schema.reduce<string[]>((acc, schemaComponent) => {
    if (schemaComponent.children) {
      notParents = [...notParents, ...schemaComponent.children]
    }

    if (!notParents.includes(schemaComponent.id)) {
      acc.push(schemaComponent.id)
    }

    return acc
  }, [])
}
