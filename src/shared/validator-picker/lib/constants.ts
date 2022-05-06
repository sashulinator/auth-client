import { CompValidator, Norm } from '@/common/types'

export const VALIDATOR_ROOT_ID = 'VALIDATOR_ROOT_ID'

export const defaultCompValidators: Norm<CompValidator> = {
  [VALIDATOR_ROOT_ID]: {
    id: VALIDATOR_ROOT_ID,
    name: 'and',
    childCompIds: [],
  },
}
