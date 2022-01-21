import { EmitAssertValidation, Schema } from '@savchenko91/schema-validator'

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

  const error = validation(value, name, false)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return error
}
