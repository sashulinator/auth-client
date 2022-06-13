import { ROOT_ID } from '@/constants/common'
import { AssertionItem, AssertionItemType, Catalog } from '@/shared/schema-drawer'

export const defaultCompValidators: Catalog<AssertionItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: AssertionItemType.OPERATOR,
    children: [],
  },
}
