import { ROOT_ID } from '@/constants/common'
import { AssertionBinding, AssertionBindingType, Catalog } from '@/shared/schema-drawer'

export const defaultCompValidators: Catalog<AssertionBinding> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: AssertionBindingType.OPERATOR,
    children: [],
  },
}
