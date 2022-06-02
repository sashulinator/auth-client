import { ROOT_ID } from '@/constants/common'
import { AssertionUnit, Norm, ValidatorItemType } from '@/entities/schema'

export const defaultCompValidators: Norm<AssertionUnit> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: ValidatorItemType.OPERATOR,
    children: [],
  },
}
