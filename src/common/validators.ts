import { Catalog, CompSchema } from '@/shared/schema-drawer'

export function isSchema(input: unknown): asserts input is CompSchema {
  return
}

export function isNormSchemas(input: unknown): asserts input is Catalog<CompSchema> {
  return
}
