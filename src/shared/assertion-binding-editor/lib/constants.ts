import { ROOT_ID } from '@/constants/common'
import { AssertionBindingItem, AssertionBindingItemType, Catalog } from '@/shared/schema-drawer'

export const defaultCompValidators: Catalog<AssertionBindingItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: AssertionBindingItemType.OPERATOR,
    children: [],
  },
}
