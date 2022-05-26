import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { BindingItem, BindingItemType, Norm } from '@/entities/schema'

const id = uniqid()

export const defaultCompBindings: Norm<BindingItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: BindingItemType.ROOT,
    children: [id],
  },
  [id]: {
    id,
    name: 'onChange',
    type: BindingItemType.EVENT,
    children: [],
  },
}
