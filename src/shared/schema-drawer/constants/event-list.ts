import { createCatalog } from '../lib/create-catalog'
import { onBlur, onChange, onDestroy, onFieldChange, onFieldLife, onFocus, onInit } from '../lib/events'
import { Dictionary, EventPackageProperties } from '../model/types'

import { generateOptionsFromObject } from '@/lib/generate-options'

export const eventList: EventPackageProperties[] = [
  {
    name: 'onFieldChange',
    function: onFieldChange,
  },
  {
    name: 'onFieldLife',
    function: onFieldLife,
  },
  {
    name: 'onChange',
    function: onChange,
  },
  {
    name: 'onBlur',
    function: onBlur,
  },
  {
    name: 'onFocus',
    function: onFocus,
  },
  {
    name: 'onInit',
    function: onInit,
  },
  {
    name: 'onDestroy',
    function: onDestroy,
  },
]

export const eventDictionary: Dictionary<EventPackageProperties> = createCatalog(eventList, 'name')

export const eventNameOptions = generateOptionsFromObject(eventDictionary)
