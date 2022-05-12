import { buildErrorTree, only, wrap } from '@savchenko91/schema-validator'

export const rootOnly = only.bind({ handleError: buildErrorTree })
export const rootWrap = wrap.bind({ handleError: buildErrorTree })
