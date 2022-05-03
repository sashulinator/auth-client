import {
  ANY_KEY,
  _null,
  _undefined,
  and,
  buildErrorTree,
  matchPattern,
  notEmptyString,
  notUndefined,
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
  only({
    ...createUserValidator,
    id: string,
    password: or(
      and(withValue(/[A-Z]/, matchPattern), withValue(/[a-z]/, matchPattern), withValue(/[0-9]/, matchPattern)),
      _undefined
    ),
  })
)

function assertComponentNameIsValid(v: unknown, meta: any) {
  if (meta?.inputObject?.type === 'COMP') {
    string(v)
  } else {
    throw Error('"componentName" must be define if type="COMP"')
  }
}

export const schemaValidator = bindedWrap(
  only({
    componentName: or(_null, assertComponentNameIsValid),
    id: string,
    name: string,
    type: string,
    comps: wrap({
      [ANY_KEY]: {
        id: string,
        compSchemaId: string,
        name: string,
        path: or(string, _undefined),
        defaultValue: or(string, _undefined),
        props: notUndefined,
        childCompIds: or([string], _undefined),
      },
    }),
  })
)
