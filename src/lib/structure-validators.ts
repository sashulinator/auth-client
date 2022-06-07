import { ValidationError, createStructureValidator, isObject } from '@savchenko91/schema-validator'

import { isStringifiedNumber } from './is'

export const objectWithNumberKeys = createStructureValidator((schema, input, meta) => {
  if (isObject(input)) {
    Object.keys(input).forEach((key) => {
      if (!isStringifiedNumber(key)) {
        throw new ValidationError({
          inputName: meta?.inputName ? `${meta?.inputName}.${key}` : key,
          input,
          code: 'assertObjectWithNumberKeys',
          message: 'Object keys are not numbers',
        })
      }
    })
  }
})
