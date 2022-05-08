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

import { assertionList } from './assertion-list'

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

  const isOr = compValidator.name === 'and'
  const isAnd = compValidator.name === 'or'

  if (isAnd || isOr) {
    const validators = compValidator?.children.map((id) => factory(id, compValidators))
    return isAnd ? and(...validators) : or(...validators)
  }

  const assertion = assertionList[compValidator.name]?.assertion

  assertNotUndefined(assertion)

  return assertion
}
