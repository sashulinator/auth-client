import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ComponentContext } from '../model/types'
import actionList from './action-list'
import { eventList } from './event-list'

import { EventUnit, EventUnitType, Norm } from '@/entities/schema'
import { findEntities } from '@/lib/entity-actions'

export default function bindEvents(context: ComponentContext) {
  const { bindings } = context.comp

  if (!bindings) {
    return
  }

  const unitsWithEventType = getEventUnits(bindings)

  unitsWithEventType.forEach((eventUnit) => {
    const eventItem = eventList[eventUnit.name]
    assertNotUndefined(eventItem)

    const actionUnits = findEntities(eventUnit.children || [], bindings)

    const actionItems = Object.values(actionUnits)?.map((actionUnit) => {
      const actionItem = actionList[actionUnit.name]
      assertNotUndefined(actionItem)
      return actionItem
    })

    const unsubscribe = eventItem?.function({
      context,
      actionUnits,
      actionItems,
      eventUnit,
      eventItem,
      bindings,
    })

    context.eventUnsubscribers.push(unsubscribe)
  })
}

function getEventUnits(units: Norm<EventUnit>): EventUnit[] {
  return Object.values(units).filter((binding) => binding.type === EventUnitType.EVENT)
}
