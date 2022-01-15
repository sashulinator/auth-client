import { assertMatchPattern, assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'
import { validate } from '@savchenko91/schema-validator/dist/validate'

import { idSchemaStructure } from '@/helpers/validators'

export const createUserSchema = {
  username: validate([assertNotUndefined, [assertMatchPattern, /^(\w*)$/]]),
  password: validate([assertNotUndefined, assertString]),
  email: validate([assertNotUndefined, assertString]),
  name: validate([assertString]),
}

export const updateUserSchema = {
  ...idSchemaStructure,
  username: validate([[assertMatchPattern, /^(\w*)$/]]),
  password: validate([assertString]),
  email: validate([assertString]),
  name: validate([assertString]),
}
