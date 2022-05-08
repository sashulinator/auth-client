import {
  ErrorCollection,
  ErrorCollector,
  Schema,
  and,
  assertNotUndefined,
  buildErrorTree,
  only,
  or,
} from '@savchenko91/schema-validator'

import { validatorList } from './validator-list'

import { CompValidator, Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'

const rootOnly = only.bind({ handleError: buildErrorTree })

export default function buildValidator(
  validators: Norm<CompValidator> | undefined
): ErrorCollector<ErrorCollection> | undefined {
  if (validators === undefined) {
    return undefined
  } else {
    const schema = rootOnly({ thereCouldBeYourAddvertisement: factory(ROOT_ID, validators) })
    return schema.thereCouldBeYourAddvertisement as ErrorCollector<ErrorCollection>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function factory(compValidatorId: string, compValidators: Norm<CompValidator>): Schema<any> {
  const compValidator = compValidators[compValidatorId]
  assertNotUndefined(compValidator)

  if (compValidator.name === 'and') {
    const validators = compValidator?.children.map((id) => factory(id, compValidators))
    return and(...validators)
  }
  if (compValidator.name === 'or') {
    const validators = compValidator?.children.map((id) => factory(id, compValidators))
    return or(...validators)
  } else {
    const fn = validatorList[compValidator.name]?.validator
    assertNotUndefined(fn)
    return fn
  }
}
