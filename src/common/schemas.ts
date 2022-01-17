import {
  assertMatchPattern,
  assertString,
  assertUndefined,
  only,
  or,
  validate,
  withValue,
} from '@savchenko91/schema-validator'

import { idSchemaStructure } from './validators'

// prettier-ignore
export const createUserSchema = only({
  username: validate(
    assertString,
    withValue(/^(\w*)$/, assertMatchPattern)
  ),
  password: validate(assertString),
  email: validate(
    assertString,
    withValue(/@.*\.*./, assertMatchPattern)
  ),
  fullname: or(
    validate(assertString),
    validate(assertUndefined)
  )
})

// prettier-ignore
export const updateUserSchema = only({
  ...idSchemaStructure,
  username: validate(
    assertString,
    withValue(/^(\w*)$/, assertMatchPattern)
  ),
  password: or(validate(assertUndefined), validate(assertString)),
  email: validate(
    assertString,
    withValue(/@.*\.*./, assertMatchPattern)
  ),
  fullname: or(
    validate(assertString),
    validate(assertUndefined)
  )
})
