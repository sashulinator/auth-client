import { Item } from '../model/types'
import { assertTargetInitValueUndefined } from './event-assertions'

import { Norm } from '@/entities/schema'
import optionsFromStringArray from '@/lib/options-from-string-array'

export const eventAssertionList: Norm<Item> = {
  targetInitValueUndefined: {
    type: 'assertion',
    function: assertTargetInitValueUndefined,
  },
}

export const eventAssertionNameOptions = optionsFromStringArray(Object.keys(eventAssertionList))
