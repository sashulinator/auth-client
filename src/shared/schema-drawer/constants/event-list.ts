import { onBlur, onChange, onDestroy, onFieldChange, onFieldLife, onFocus, onInit } from '../lib/events'
import { Catalog, EventListItem } from '../model/types'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventList: Catalog<EventListItem> = {
  [onFieldChange.name]: {
    function: onFieldChange,
  },
  [onFieldLife.name]: {
    function: onFieldLife,
  },
  [onChange.name]: {
    function: onChange,
  },
  [onBlur.name]: {
    function: onBlur,
  },
  [onFocus.name]: {
    function: onFocus,
  },
  [onInit.name]: {
    function: onInit,
  },
  [onDestroy.name]: {
    function: onDestroy,
  },
}

export const eventNameOptions = generateOptionsFromObject(eventList)
