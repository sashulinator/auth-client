import { ROOT_ID } from '@/constants/common'
import { AssertionSchemaItem, AssertionSchemaItemType, Catalog } from '@/shared/schema-drawer'

export const defaultCompValidators: Catalog<AssertionSchemaItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: AssertionSchemaItemType.OPERATOR,
    children: [],
  },
}
