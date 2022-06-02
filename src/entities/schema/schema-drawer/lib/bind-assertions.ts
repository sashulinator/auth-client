import {
  ErrorCollection,
  ErrorCollector,
  Schema,
  and,
  assertNotUndefined,
  buildErrorTree,
  only,
  or,
  withValue,
} from '@savchenko91/schema-validator'

import { assertionList } from './assertion-list'
import { formToOneValueIfNeeded } from './form-to-one-value'

import { ROOT_ID } from '@/constants/common'
import { Norm, ValidatorItem } from '@/entities/schema'

const rootOnly = only.bind({ handleError: buildErrorTree })

export default function bindAssertions(
  validators: Norm<ValidatorItem> | undefined
): ErrorCollector<ErrorCollection> | undefined {
  if (validators === undefined) {
    return undefined
  } else {
    const schema = rootOnly({ thereCouldBeYourAddvertisement: factory(ROOT_ID, validators) })
    return schema.thereCouldBeYourAddvertisement as ErrorCollector<ErrorCollection>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function factory(compValidatorId: string, compValidators: Norm<ValidatorItem>): Schema<any> {
  const compValidator = compValidators[compValidatorId]
  assertNotUndefined(compValidator)

  const isOr = compValidator.name === 'and'
  const isAnd = compValidator.name === 'or'

  if (isAnd || isOr) {
    const validators = compValidator?.children?.map((id) => factory(id, compValidators)) ?? []
    return isAnd ? and(...validators) : or(...validators)
  }

  const assertionItem = assertionList[compValidator.name]
  assertNotUndefined(assertionItem)

  const isWithValueAssertion = assertionItem.type === 'withValue'

  if (isWithValueAssertion) {
    const props = formToOneValueIfNeeded(compValidator.props)
    return withValue(props, assertionItem.function)
  }

  return assertionItem.function
}
