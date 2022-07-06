import {
  ValidationError,
  buildErrorArray,
  buildErrorTree,
  createStructureValidator,
  isObject,
  only,
  wrap,
} from '@savchenko91/schema-validator'

import { isStringifiedNumber } from './is'

export const rootOnly = only.bind({ handleError: buildErrorTree })
export const rootWrap = wrap.bind({ handleError: buildErrorTree })

export const rootWrapArr = wrap.bind({ handleError: buildErrorArray })
export const rootOnlyArr = only.bind({ handleError: buildErrorArray })

export const objectWithNumberKeys = createStructureValidator((schema, input, meta) => {
  if (isObject(input)) {
    Object.keys(input).forEach((key) => {
      if (!isStringifiedNumber(key)) {
        throw new ValidationError({
          inputName: meta?.inputName ? `${meta?.inputName}.${key}` : key,
          input,
          code: 'assertObjectWithNumberKeys',
          message: 'Object keys are not numbers',
          path: meta.path,
        })
      }
    })
  }
})
