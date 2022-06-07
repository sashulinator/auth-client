import { onFieldChange } from '../lib/events'
import { Norm } from '../model/types'
import { EventListItem } from '../schema-drawer/model/types'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventList: Norm<EventListItem> = {
  [onFieldChange.name]: {
    function: onFieldChange,
  },
}

export const eventNameOptions = generateOptionsFromObject(eventList)
