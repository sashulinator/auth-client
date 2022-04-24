import { isString } from '@savchenko91/schema-validator'

import { FormSchemaItem } from '@/types/entities'

export function flatSchema(schemas: FormSchemaItem[]): FormSchemaItem[] {
  if (typeof schemas?.[0] === 'string') {
    return schemas
  }

  const childrenArr = schemas.reduce<FormSchemaItem[]>((acc, schemaItem) => {
    if (schemaItem.children) {
      const normSchema = flatSchema(schemaItem.children as FormSchemaItem[])
      if (normSchema) {
        return [...acc, ...normSchema]
      }
    }
    return acc
  }, [])

  return [...schemas, ...childrenArr] as FormSchemaItem[]
}

export function normalizeToHashSchema(schema: FormSchemaItem[]): Record<string, FormSchemaItem> {
  const res = flatSchema(schema)?.reduce<Record<string, FormSchemaItem>>((acc, schemaItem) => {
    if (isString(schemaItem)) {
      return acc
    }
    acc[schemaItem.id] = schemaItem
    return acc
  }, {})

  return res || {}
}
