import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionList } from '../constants/action-list'
import { eventAssertionList } from '../constants/event-assertion-list'
import { eventList } from '../constants/event-list'
import {
  ActionProps,
  Catalog,
  EventBindingSchemaItem,
  EventSchemaItemType,
  FieldComponentContext,
} from '../model/types'
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

  unitsWithEventType.forEach((eventUnit) => {
    const eventItem = eventList[eventUnit.name]
    assertNotUndefined(eventItem)

    const actionUnits = findEntities(eventUnit.children || [], eventBindingSchema)

    const actionItems = Object.values(actionUnits)?.map((actionUnit) => {
      const actionItem = actionList[actionUnit.name]
      assertNotUndefined(actionItem)
      return actionItem
    })

    const basicProps = {
      context,
      actionUnits,
      actionItems,
      eventUnit,
      eventItem,
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

    const createdEvent = eventItem.function(eventProps)

    context.observer.addEvent(eventUnit.name, createdEvent)
  })
}

// Private

function getEventUnits(units: Catalog<EventBindingSchemaItem>): EventBindingSchemaItem[] {
  return Object.values(units).filter((binding) => binding.type === EventSchemaItemType.EVENT)
}

function addRootOperator(eventBindingSchema: Catalog<EventBindingSchemaItem>, actionId: string) {
  const actionUnit = findEntity(actionId, eventBindingSchema)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(eventBindingSchema, newActionUnit.id, newActionUnit)
  const orOperator: EventBindingSchemaItem = {
    id: operatorId,
    name: 'and',
    type: EventSchemaItemType.OPERATOR,
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
