import { isObject } from '@savchenko91/schema-validator'

import { MUTATE_ALL_FORM_VALUES_TO_STRING } from '../constants/constants'

/**
 * Mutates all form values to one if MUTATE_ALL_FORM_VALUES_TO_STRING set
 */
export function formToOneValueIfNeeded(props: unknown) {
  if (isObject(props)) {
    const keys = Object.keys(props) || []
    const isToOneValue = keys[0] === MUTATE_ALL_FORM_VALUES_TO_STRING
    return isToOneValue ? props[MUTATE_ALL_FORM_VALUES_TO_STRING] : props
  }

  return props
}
