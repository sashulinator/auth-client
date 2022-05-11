import { isObject } from '@savchenko91/schema-validator'

import { MUTATE_ALL_FORM_VALUES_TO_STRING } from '@/constants/common'

// мутирует всю форму в одно значение если необходимо
export function formToOneValueIfNeeded(input2: unknown) {
  if (isObject(input2)) {
    const keys = Object.keys(input2) || []
    const isToOneValue = keys[0] === MUTATE_ALL_FORM_VALUES_TO_STRING
    return isToOneValue ? input2[MUTATE_ALL_FORM_VALUES_TO_STRING] : input2
  }

  return input2
}
