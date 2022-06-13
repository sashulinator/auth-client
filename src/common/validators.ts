import { Catalog, Schema } from '@/shared/schema-drawer'

export function isSchema(input: unknown): asserts input is Schema {
  return
}

export function isNormSchemas(input: unknown): asserts input is Catalog<Schema> {
  return
}
