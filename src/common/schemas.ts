import {
  assertMatchPattern,
  assertString,
  assertUndefined,
  only,
  or,
  primitive,
  withValue,
} from '@savchenko91/schema-validator'

import { idSchemaStructure } from './validators'

// prettier-ignore
export const createUserSchema = only({
  username: primitive(
    assertString,
    withValue(/^(\w*)$/, assertMatchPattern)
  ),
  password: primitive(assertString),
  email: primitive(
    assertString,
    withValue(/@.*\.*./, assertMatchPattern)
  ),
  fullname: or(
    primitive(assertString),
    primitive(assertUndefined)
  )
})

// prettier-ignore
export const updateUserSchema = only({
  ...idSchemaStructure,
  username: primitive(
    assertString,
    withValue(/^(\w*)$/, assertMatchPattern)
  ),
  password: or(primitive(assertUndefined), primitive(assertString)),
  email: primitive(
    assertString,
    withValue(/@.*\.*./, assertMatchPattern)
  ),
  fullname: or(
    primitive(assertString),
    primitive(assertUndefined)
  )
})
