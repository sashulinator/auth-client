import { CompValidator, Norm } from '@/common/types'
import { ROOT_ID } from '@/constants/common'

export const defaultCompValidators: Norm<CompValidator> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    children: [],
  },
}
