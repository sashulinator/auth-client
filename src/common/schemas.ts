import {
  _undefined,
  and,
  buildErrorTree,
  matchPattern,
  notEmptyString,
  only,
  or,
  string,
  withValue,
  wrap,
} from '@savchenko91/schema-validator'

import { CreateUser, UpdateUser } from './types'

const bindedWrap = wrap.bind({ handleError: buildErrorTree })

export const createUserValidator = bindedWrap(
  only<CreateUser>({
    username: and(string, withValue(/^(\w*)$/, matchPattern)),
    password: and(
      string,
      notEmptyString,
      withValue(/[A-Z]/, matchPattern),
      withValue(/[a-z]/, matchPattern),
      withValue(/[0-9]/, matchPattern)
    ),
    email: and(string, withValue(/@.*\.*./, matchPattern)),
    fullname: or(string, _undefined),
  })
)

export const updateUserValidator = bindedWrap(
  only<UpdateUser>({
    ...createUserValidator,
    id: string,
    password: or(
      and(withValue(/[A-Z]/, matchPattern), withValue(/[a-z]/, matchPattern), withValue(/[0-9]/, matchPattern)),
      _undefined
    ),
  })
)
