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

const bindedWrap = wrap.bind({ handleError: buildErrorTree })

export const createUserValidator = bindedWrap(
  only({
    username: and(string, withValue(/^(\w*)$/, matchPattern)),
    password: and(string, notEmptyString),
    email: and(string, withValue(/@.*\.*./, matchPattern)),
    fullname: or(string, _undefined),
  })
)

export const updateUserValidator = only({
  id: string,
  ...createUserValidator,
})
