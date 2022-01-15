import { assertMatchPattern, assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'
import { only } from '@savchenko91/schema-validator/dist/structure-validators'
import { validate } from '@savchenko91/schema-validator/dist/validate'

import { idSchemaStructure } from './validators'

export const createUserSchema = only({
  username: validate([assertNotUndefined, [assertMatchPattern, /^(\w*)$/]]),
  password: validate([assertNotUndefined, assertString]),
  email: validate([assertNotUndefined, assertString]),
  fullname: validate([assertString]),
})

export const updateUserSchema = only({
  ...idSchemaStructure,
  username: validate([[assertMatchPattern, /^(\w*)$/]]),
  password: validate([assertString]),
  email: validate([assertString]),
  fullname: validate([assertString]),
})
