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
import { eventAssertionList } from './event-assertion-list'
import { formToOneValueIfNeeded } from './form-to-one-value'

import { ROOT_ID } from '@/constants/common'
import { BindingUnit, Norm } from '@/entities/schema'

const rootOnly = only.bind({ handleError: buildErrorTree })

export default function bindAssertions(
  units: Norm<BindingUnit> | undefined,
  rootId = ROOT_ID
): ErrorCollector<ErrorCollection> | undefined {
  if (units === undefined) {
    return undefined
  }

  const schema = rootOnly({ hereCouldBeYourAd: factory(rootId, units) })

  return schema.hereCouldBeYourAd as ErrorCollector<ErrorCollection>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function factory(compValidatorId: string, compValidators: Norm<BindingUnit>): Schema<any> {
  const compValidator = compValidators[compValidatorId]
  assertNotUndefined(compValidator)

  const isOr = compValidator.name === 'and'
  const isAnd = compValidator.name === 'or'

  if (isAnd || isOr) {
    const validators = compValidator?.children?.map((id) => factory(id, compValidators)) ?? []
    return isAnd ? and(...validators) : or(...validators)
  }

  const assertionItem = assertionList[compValidator.name] || eventAssertionList[compValidator.name]
  assertNotUndefined(assertionItem)

  const isWithValueAssertion = assertionItem.type === 'withValue'

  if (isWithValueAssertion) {
    const props = formToOneValueIfNeeded(compValidator.props)
    return withValue(props, assertionItem.function)
  }

  return assertionItem.function
}
