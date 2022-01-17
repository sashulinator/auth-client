import { assertMatchPattern, assertNotUndefined, assertString, only, validate } from '@savchenko91/schema-validator'

import { idSchemaStructure } from './validators'

export const createUserSchema = only({
  username: validate(assertNotUndefined, [assertMatchPattern, /^(\w*)$/]),
  password: validate(assertNotUndefined, assertString),
  email: validate(assertNotUndefined, assertString, [assertMatchPattern, /@.*\.*./, 'email']),
  fullname: validate(assertString),
})

export const updateUserSchema = only({
  ...idSchemaStructure,
  username: validate([assertMatchPattern, /^(\w*)$/]),
  password: validate(assertString),
  email: validate(assertString),
  fullname: validate(assertString),
})
