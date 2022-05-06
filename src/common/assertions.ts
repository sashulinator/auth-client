import { assertString } from '@savchenko91/schema-validator'

export function assertSchemaComponentNameIsValid(componentNameValue: unknown, typeValue: unknown) {
  if (typeValue === 'COMP') {
    assertString(componentNameValue)
  } else {
    throw Error('"componentName" must be define if type="COMP"')
  }
}
