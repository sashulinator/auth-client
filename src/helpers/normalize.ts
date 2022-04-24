import { FormSchemaItem } from '@/types/entities'

export function normalizeSchema(schemas: FormSchemaItem[]): FormSchemaItem[] {
  if (typeof schemas?.[0] === 'string') {
    return schemas
  }

  const childrenArr = schemas.reduce<FormSchemaItem[]>((acc, schemaItem) => {
    if (schemaItem.children) {
      const normSchema = normalizeSchema(schemaItem.children as FormSchemaItem[])
      if (normSchema) {
        return [...acc, ...normSchema]
      }
    }
    return acc
  }, [])

  return [...schemas, ...childrenArr] as FormSchemaItem[]
}

export function normalizeToHashSchema(schema: FormSchemaItem[]): Record<string, FormSchemaItem> {
  const res = normalizeSchema(schema)?.reduce<Record<string, FormSchemaItem>>((acc, schemaItem) => {
    acc[schemaItem.id] = schemaItem
    return acc
  }, {})

  return res || {}
}
