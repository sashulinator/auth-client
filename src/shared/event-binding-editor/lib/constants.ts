import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Catalog, EventUnit, EventUnitType, onFieldChange } from '@/shared/schema-drawer'

const id = uniqid()

export const defaultCompBindings: Catalog<EventUnit> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: EventUnitType.ROOT,
    children: [id],
  },
  [id]: {
    id,
    name: onFieldChange.name,
    type: EventUnitType.EVENT,
    children: [],
  },
}
