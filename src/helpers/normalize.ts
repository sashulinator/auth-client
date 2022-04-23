import { NormSchema, SchemaItem } from '@/types/entities'

export function normalizeSchema(schemas: SchemaItem[]): NormSchema[] | undefined {
  if (typeof schemas?.[0] === 'string') {
    return undefined
  }

  const childrenArr = schemas.reduce<NormSchema[]>((acc, schemaItem) => {
    if (schemaItem.children) {
      const normSchema = normalizeSchema(schemaItem.children as NormSchema[])
      if (normSchema) {
        return [...acc, ...normSchema]
      }
    }
    return acc
  }, [])

  return [...schemas, ...childrenArr] as NormSchema[]
}

export function normalizeToHashSchema(schema: SchemaItem[]): Record<string, NormSchema> {
  const res = normalizeSchema(schema)?.reduce<Record<string, NormSchema>>((acc, schemaItem) => {
    acc[schemaItem.id] = schemaItem
    return acc
  }, {})

  return res || {}
}
