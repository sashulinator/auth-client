import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionList } from '../../constants/action-list'
import { Norm } from '../../model/types'
import { EventListItem, EventProps } from '../model/types'

import { generateOptionsFromObject } from '@/lib/generate-options'

// TODO
function onFieldChange(eventProps: EventProps) {
  const { context, actionUnits } = eventProps
  assertNotUndefined(context.comp.name)

  return context.fns.onFieldChange(context.comp.name, (value) => {
    Object.values(actionUnits).forEach((actionUnit) => {
      const actionItem = actionList[actionUnit.name]
      assertNotUndefined(actionItem)
      actionItem?.function({ ...eventProps, actionUnit, actionItem }, value)
    })
  })
}

export const eventList: Norm<EventListItem> = {
  [onFieldChange.name]: {
    function: onFieldChange,
  },
}

// TODO
export const eventNameOptions = generateOptionsFromObject(eventList)
