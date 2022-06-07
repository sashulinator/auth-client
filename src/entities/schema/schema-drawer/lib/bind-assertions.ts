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

import { BindingUnit, ListItem, Norm } from '../../model/types'
import { formToOneValueIfNeeded } from './form-to-one-value'

import { ROOT_ID } from '@/constants/common'

const rootOnly = only.bind({ handleError: buildErrorTree })

export default function bindAssertions(
  assertionList: Norm<ListItem>,
  units: Norm<BindingUnit> | undefined,
  rootId = ROOT_ID
): ErrorCollector<ErrorCollection> | undefined {
  if (units === undefined) {
    return undefined
  }

  const schema = rootOnly({ hereCouldBeYourAd: factory(assertionList, units, rootId) })

  return schema.hereCouldBeYourAd as ErrorCollector<ErrorCollection>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function factory(assertionList: Norm<ListItem>, units: Norm<BindingUnit>, unitId: string): Schema<any> {
  const compValidator = units[unitId]
  assertNotUndefined(compValidator)

  const isOr = compValidator.name === 'and'
  const isAnd = compValidator.name === 'or'

  if (isAnd || isOr) {
    const validators = compValidator?.children?.map((id) => factory(assertionList, units, id)) ?? []
    return isAnd ? and(...validators) : or(...validators)
  }

  const assertionItem = assertionList[compValidator.name]
  assertNotUndefined(assertionItem)

  const props = formToOneValueIfNeeded(compValidator.props)

  return withValue(props, assertionItem.function)
}
