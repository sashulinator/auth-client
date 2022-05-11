import { Norm, Schema } from '@/entities/schema'

export function isSchema(input: unknown): asserts input is Schema {
  return
}

export function isNormSchemas(input: unknown): asserts input is Norm<Schema> {
  return
}
