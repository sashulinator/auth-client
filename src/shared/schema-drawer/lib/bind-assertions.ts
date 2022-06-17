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

import { Binding, BindingMeta, Catalog } from '../model/types'
import { formToOneValueIfNeeded } from './form-to-one-value'

import { ROOT_ID } from '@/constants/common'

const rootOnly = only.bind({ handleError: buildErrorTree })

export default function bindAssertions(
  assertionList: Catalog<BindingMeta>,
  units: Catalog<Binding> | undefined,
  rootId = ROOT_ID
): ErrorCollector<ErrorCollection> | undefined {
  if (units === undefined) {
    return undefined
  }

  const schema = rootOnly({ hereCouldBeYourAd: factory(assertionList, units, rootId) })

  return schema.hereCouldBeYourAd as ErrorCollector<ErrorCollection>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function factory(assertionList: Catalog<BindingMeta>, units: Catalog<Binding>, unitId: string): Schema<any> {
  const compValidator = units[unitId]
  assertNotUndefined(compValidator)

  const isOr = compValidator.name === 'or' || compValidator.id === ROOT_ID
  const isAnd = compValidator.name === 'and'

  if (isAnd || isOr) {
    const validators = compValidator?.children?.map((id) => factory(assertionList, units, id)) ?? []
    return isAnd ? and(...validators) : or(...validators)
  }

  const assertionItem = assertionList[compValidator.name]
  if (assertionItem === undefined) {
    console.log(compValidator)
  }
  assertNotUndefined(assertionItem)

  const props = formToOneValueIfNeeded(compValidator.props)

  return withValue(props, assertionItem.function)
}
