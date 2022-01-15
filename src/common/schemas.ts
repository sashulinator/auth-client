import { idSchemaStructure, throwError } from 'src/common/validators'
import { only } from '@savchenko91/schema-validator/dist/structure-validators'
import { validate } from '@savchenko91/schema-validator/dist/validate'
import { assertMatchPattern, assertNotUndefined, assertString } from '@savchenko91/schema-validator/dist/assertions'

export const createUserSchema = {
  username: validate([assertNotUndefined, [assertMatchPattern, /^(\w*)$/]]),
  password: validate([assertNotUndefined, assertString]),
  email: validate([assertNotUndefined, assertString]),
  name: validate([assertString]),
}

export const validateCreateUser = throwError('createUserSchema')(only(createUserSchema))

export const updateUserSchema = {
  ...idSchemaStructure,
  username: validate([[assertMatchPattern, /^(\w*)$/]]),
  password: validate([assertString]),
  email: validate([assertString]),
  name: validate([assertString]),
}

export const validateUpdateUser = throwError('updateUserSchema')(only(updateUserSchema))
