import { string } from '@savchenko91/schema-validator'

import { rootWrap } from './validators'

export function isStringArray(input: unknown): input is string[] {
  const errors = rootWrap([string])(input)
  return !errors
}
