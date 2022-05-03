import {
  ANY_KEY,
  _null,
  _undefined,
  and,
  buildErrorTree,
  keyDoesNotExist,
  matchPattern,
  notEmptyString,
  only,
  or,
  string,
  withRef,
  withValue,
  wrap,
} from '@savchenko91/schema-validator'

const rootOnly = only.bind({ handleError: buildErrorTree })

function assertComponentNameIsValid(componentNameValue: unknown, typeValue: unknown) {
  if (typeValue === 'COMP') {
    string(componentNameValue)
  } else {
    throw Error('"componentName" must be define if type="COMP"')
  }
}

export const schemaValidator = rootOnly({
  componentName: or(_null, withRef('type', assertComponentNameIsValid)),
  id: string,
  name: string,
  type: string,
  comps: wrap({
    [ANY_KEY]: {
      id: string,
      compSchemaId: and(string, notEmptyString),
      name: and(string, notEmptyString),
      path: or(string, keyDoesNotExist),
      defaultValue: or(string, keyDoesNotExist),
      props: or(keyDoesNotExist, {
        label: or(string, keyDoesNotExist),
      }),
      childCompIds: or([string], keyDoesNotExist),
    },
  }),
})

export const createUserValidator = rootOnly({
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

export const updateUserValidator = rootOnly({
  ...createUserValidator,
  id: string,
  password: or(
    and(withValue(/[A-Z]/, matchPattern), withValue(/[a-z]/, matchPattern), withValue(/[0-9]/, matchPattern)),
    _undefined
  ),
})
