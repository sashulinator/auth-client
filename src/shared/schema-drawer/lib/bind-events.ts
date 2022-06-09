import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionList } from '../constants/action-list'
import { eventAssertionList } from '../constants/event-assertion-list'
import { eventList } from '../constants/event-list'
import { ActionProps, EventUnit, EventUnitType, FieldComponentContext, Norm } from '../model/types'
import bindAssertions from './bind-assertions'

import { insert, replace } from '@/lib/change-unmutable'
import { findEntities, findEntity } from '@/lib/entity-actions'

const operatorId = 'operatorId'

export default function bindEvents(context: FieldComponentContext) {
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

    const basicProps = {
      context,
      actionUnits,
      actionItems,
      eventUnit,
      eventItem,
      bindings,
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

    eventItem?.function({ ...basicProps, emitActions })
  })
}

// Private

function getEventUnits(units: Norm<EventUnit>): EventUnit[] {
  return Object.values(units).filter((binding) => binding.type === EventUnitType.EVENT)
}

function addRootOperator(bindings: Norm<EventUnit>, actionId: string) {
  const actionUnit = findEntity(actionId, bindings)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(bindings, newActionUnit.id, newActionUnit)
  const orOperator: EventUnit = {
    id: operatorId,
    name: 'and',
    type: EventUnitType.OPERATOR,
    children: actionUnit.children,
  }
  const newBindings2 = insert(newBindings, operatorId, orOperator)

  return newBindings2
}

function isValid(actionProps: ActionProps, value: any) {
  const { actionUnit, bindings } = actionProps
  const newBindings = addRootOperator(bindings, actionUnit.id)

  const validate = bindAssertions(eventAssertionList, newBindings, operatorId)

  const errors = validate?.(value, { payload: actionProps, path: '' })

  return !errors
}
