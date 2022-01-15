import { assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'
import { EmitAssertValidation, StructureSchema } from '@savchenko91/schema-validator/dist/types'
import { validate } from '@savchenko91/schema-validator/dist/validate'

import { FieldValidator } from 'final-form'

export interface FindManySettings {
  maxTake: number
}

export interface FindManyParams {
  take: string
  skip: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateAdapter = <Value = unknown>(
  schema: Record<string, EmitAssertValidation>
): FieldValidator<Value> => (value, allValues, meta) => {
  if (!meta?.name || Array.isArray(schema) || typeof schema?.[meta?.name] !== 'function') {
    return
  }

  return schema[meta?.name](value, meta?.name, false)
}

// TODO add assertMatchPattern
export const idSchemaStructure: StructureSchema = { id: validate([assertNotUndefined, assertString]) }
