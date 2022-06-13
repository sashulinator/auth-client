import { ROOT_ID } from '@/constants/common'
import { AssertionUnit, AssertionUnitType, Catalog } from '@/shared/schema-drawer'

export const defaultCompValidators: Catalog<AssertionUnit> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: AssertionUnitType.OPERATOR,
    children: [],
  },
}
