import { ROOT_ID } from '@/constants/common'
import { CompValidator, Norm } from '@/entities/schema'

export const defaultCompValidators: Norm<CompValidator> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'and',
    children: [],
  },
}
