import { ROOT_ID } from '@/constants/common'
import { AssertionUnit, AssertionUnitType, Norm } from '@/shared/schema-drawer'

export const defaultCompValidators: Norm<AssertionUnit> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: AssertionUnitType.OPERATOR,
    children: [],
  },
}
