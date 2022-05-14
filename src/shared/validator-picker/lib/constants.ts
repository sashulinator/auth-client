import { ROOT_ID } from '@/constants/common'
import { Norm, ValidatorItem, ValidatorItemType } from '@/entities/schema'

export const defaultCompValidators: Norm<ValidatorItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    type: ValidatorItemType.OPERATOR,
    children: [],
  },
}
