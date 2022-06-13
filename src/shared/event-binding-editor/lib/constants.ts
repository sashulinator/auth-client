import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Catalog, EventBindingItem, EventItemType, onFieldChange } from '@/shared/schema-drawer'

const id = uniqid()

export const defaultCompBindings: Catalog<EventBindingItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: EventItemType.ROOT,
    children: [id],
  },
  [id]: {
    id,
    name: onFieldChange.name,
    type: EventItemType.EVENT,
    children: [],
  },
}
