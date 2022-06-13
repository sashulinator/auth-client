import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionList } from '../constants/action-list'
import { eventAssertionList } from '../constants/event-assertion-list'
import { eventList } from '../constants/event-list'
import { ActionProps, Catalog, EventBindingItem, EventItemType, FieldComponentContext } from '../model/types'
import bindAssertions from './bind-assertions'

import { insert, replace } from '@/lib/change-unmutable'
import { findEntities, findEntity } from '@/lib/entity-actions'

const operatorId = 'operatorId'

export default function bindEvents(context: FieldComponentContext) {
  const { bindings: eventBindingSchema } = context.comp

  if (!eventBindingSchema) {
    return
  }

  const unitsWithEventType = getEventUnits(eventBindingSchema)

  unitsWithEventType.forEach((eventBindingItem) => {
    const eventBindingMeta = eventList[eventBindingItem.name]
    assertNotUndefined(eventBindingMeta)

    const actionUnits = findEntities(eventBindingItem.children || [], eventBindingSchema)

    const actionItems = Object.values(actionUnits)?.map((actionUnit) => {
      const actionItem = actionList[actionUnit.name]
      assertNotUndefined(actionItem)
      return actionItem
    })

    const basicProps = {
      context,
      actionUnits,
      actionItems,
      eventBindingItem,
      eventBindingMeta,
      eventBindingSchema,
      emitActions,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function emitActions(value: any) {
      Object.values(actionUnits).forEach((actionUnit) => {
        const actionItem = actionList[actionUnit.name]
        assertNotUndefined(actionItem)
        const actionProps = { ...basicProps, actionUnit, actionItem }

        if (isValid(actionProps, value)) {
          actionItem?.function({ ...basicProps, actionUnit, actionItem }, value)
        }
      })
    }

    const eventProps = { ...basicProps, emitActions }

    const createdEvent = eventBindingMeta.function(eventProps)

    context.observer.addEvent(eventBindingItem.name, createdEvent)
  })
}

// Private

function getEventUnits(units: Catalog<EventBindingItem>): EventBindingItem[] {
  return Object.values(units).filter((binding) => binding.type === EventItemType.EVENT)
}

function addRootOperator(eventBindingSchema: Catalog<EventBindingItem>, actionId: string) {
  const actionUnit = findEntity(actionId, eventBindingSchema)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(eventBindingSchema, newActionUnit.id, newActionUnit)
  const orOperator: EventBindingItem = {
    id: operatorId,
    name: 'and',
    type: EventItemType.OPERATOR,
    children: actionUnit.children,
  }
  const newBindings2 = insert(newBindings, operatorId, orOperator)

  return newBindings2
}

function isValid(actionProps: ActionProps, value: any) {
  const { actionUnit, eventBindingSchema: eventBindingSchema } = actionProps
  const newBindings = addRootOperator(eventBindingSchema, actionUnit.id)

  const validate = bindAssertions(eventAssertionList, newBindings, operatorId)

  const errors = validate?.(value, { payload: actionProps, path: '' })

  return !errors
}
