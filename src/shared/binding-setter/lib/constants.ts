import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { EventUnit, EventUnitType, Norm } from '@/entities/schema'

const id = uniqid()

export const defaultCompBindings: Norm<EventUnit> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: EventUnitType.ROOT,
    children: [id],
  },
  [id]: {
    id,
    name: 'onChange',
    type: EventUnitType.EVENT,
    children: [],
  },
}
