import { onBlur, onDestroy, onFieldChange, onFieldLife, onInit } from '../lib/events'
import { EventListItem, Norm } from '../model/types'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventList: Norm<EventListItem> = {
  [onFieldChange.name]: {
    function: onFieldChange,
  },
  [onInit.name]: {
    function: onInit,
  },
  [onFieldLife.name]: {
    function: onFieldLife,
  },
  [onBlur.name]: {
    function: onBlur,
  },
  [onDestroy.name]: {
    function: onDestroy,
  },
}

export const eventNameOptions = generateOptionsFromObject(eventList)
