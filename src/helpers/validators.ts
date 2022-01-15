import { assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'
import { EmitAssertValidation, Schema, StructureSchema } from '@savchenko91/schema-validator/dist/types'
import { validate } from '@savchenko91/schema-validator/dist/validate'

import { FieldValidator } from 'final-form'

export interface FindManySettings {
  maxTake: number
}

export interface FindManyParams {
  take: string
  skip: string
}

export const validateAdapter = <Value = unknown>(schema: Schema): FieldValidator<Value> => (value, allValues, meta) => {
  const name = meta?.name as keyof Schema

  if (!meta?.name || Array.isArray(schema) || typeof schema?.[name] !== 'function') {
    return
  }

  const validation = schema[name] as EmitAssertValidation

  return validation(value, name, false)
}

// TODO add assertMatchPattern
export const idSchemaStructure: StructureSchema = { id: validate([assertNotUndefined, assertString]) }
