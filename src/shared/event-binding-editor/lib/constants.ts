import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Catalog, EventBinding, EventType, onFieldChange } from '@/shared/schema-drawer'

const id = uniqid()

export const defaultCompBindings: Catalog<EventBinding> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: EventType.ROOT,
    children: [id],
  },
  [id]: {
    id,
    name: onFieldChange.name,
    type: EventType.EVENT,
    children: [],
  },
}
