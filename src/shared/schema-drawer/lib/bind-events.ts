import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionList } from '../constants/action-list'
import { eventAssertionList } from '../constants/event-assertion-list'
import { eventList } from '../constants/event-list'
import { ActionProps, Catalog, EventBinding, EventType, FieldComponentContext } from '../model/types'
import bindAssertions from './bind-assertions'

import { insert, replace } from '@/lib/change-unmutable'
import { findEntities, findEntity } from '@/lib/entity-actions'

const operatorId = 'operatorId'

export default function bindEvents(context: FieldComponentContext) {
  const { bindings: eventBindingCatalog } = context.comp

  if (!eventBindingCatalog) {
    return
  }

  const unitsWithEventType = getEventUnits(eventBindingCatalog)

  unitsWithEventType.forEach((eventBinding) => {
    const eventBindingMeta = eventList[eventBinding.name]
    assertNotUndefined(eventBindingMeta)

    const actionBindingCatalog = findEntities(eventBinding.children || [], eventBindingCatalog)

    const basicProps = {
      context,
      actionBindingCatalog,
      eventBinding,
      eventBindingMeta,
      eventBindingCatalog,
      emitActions,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function emitActions(value: any) {
      Object.values(actionBindingCatalog).forEach((actionUnit) => {
        const actionBindingMeta = actionList[actionUnit.name]
        assertNotUndefined(actionBindingMeta)
        const actionProps = { ...basicProps, actionUnit, actionBindingMeta }

        if (isValid(actionProps, value)) {
          actionBindingMeta?.function({ ...basicProps, actionUnit, actionBindingMeta }, value)
        }
      })
    }

    const eventProps = { ...basicProps, emitActions }

    const createdEvent = eventBindingMeta.function(eventProps)

    context.observer.addEvent(eventBinding.name, createdEvent)
  })
}

// Private

function getEventUnits(units: Catalog<EventBinding>): EventBinding[] {
  return Object.values(units).filter((binding) => binding.type === EventType.EVENT)
}

function addRootOperator(eventBindingCatalog: Catalog<EventBinding>, actionId: string) {
  const actionUnit = findEntity(actionId, eventBindingCatalog)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(eventBindingCatalog, newActionUnit.id, newActionUnit)
  const orOperator: EventBinding = {
    id: operatorId,
    name: 'and',
    type: EventType.OPERATOR,
    children: actionUnit.children,
  }
  const newBindings2 = insert(newBindings, operatorId, orOperator)

  return newBindings2
}

function isValid(actionProps: ActionProps, value: any) {
  const { actionUnit, eventBindingCatalog } = actionProps
  const newBindings = addRootOperator(eventBindingCatalog, actionUnit.id)

  const validate = bindAssertions(eventAssertionList, newBindings, operatorId)

  const errors = validate?.(value, { payload: actionProps, path: '' })

  return !errors
}
