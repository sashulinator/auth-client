import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionDictionary } from '../constants/action-list'
import { eventAssertionBindingMetaCatalog } from '../constants/event-assertion-list'
import { eventDictionary } from '../constants/event-list'
import {
  ActionProps,
  Dictionary,
  EventBinding,
  EventBindingType,
  EventProps,
  FieldComponentContext,
} from '../model/types'
import bindAssertions from './bind-assertions'

import { ROOT_ID } from '@/constants/common'
import { insert, replace } from '@/lib/change-unmutable'
import { findEntities, findEntity } from '@/lib/entity-actions'

const operatorId = 'operatorId'

export default function bindEvents(context: FieldComponentContext) {
  const { eventBindingSchema } = context.comp

  if (!eventBindingSchema) {
    return
  }

  const rootBinding = eventBindingSchema.data[ROOT_ID]
  assertNotUndefined(rootBinding?.children)

  const eventBindingCatalog = findEntities(rootBinding.children, eventBindingSchema.data)

  Object.values(eventBindingCatalog).forEach((eventBinding) => {
    const eventBindingMeta = eventDictionary[eventBinding.name]

    if (eventBindingMeta === undefined) {
      console.log(`eventBindingMeta ${eventBinding.name}`)
      return
    }

    const actionBindingCatalog = findEntities(eventBinding.children || [], eventBindingSchema.data)

    const eventProps: EventProps = {
      eventBindingSchema,
      eventBindingCatalog,
      eventBinding,
      eventBindingMeta,
      actionBindingCatalog,
      context,
      emitActions,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function emitActions(value: any) {
      Object.values(actionBindingCatalog).forEach((actionBinding) => {
        const actionBindingMeta = actionDictionary[actionBinding.name]

        if (actionBindingMeta === undefined) {
          console.log(`actionBindingMeta ${actionBinding.name}`)
          return
        }

        const actionProps = { ...eventProps, actionBinding, actionBindingMeta }

        if (isPassedAssertions(actionProps, value)) {
          actionBindingMeta?.function({ ...eventProps, actionBinding, actionBindingMeta }, value)
        }
      })
    }

    const createdEvent = eventBindingMeta.function(eventProps)

    context.observer.addEvent(eventBinding.name, createdEvent)
  })
}

// Private

function addRootOperator(eventBindingCatalog: Dictionary<EventBinding>, actionId: string) {
  const actionUnit = findEntity(actionId, eventBindingCatalog)
  const newActionUnit = { ...actionUnit, children: [operatorId] }
  const newBindings = replace(eventBindingCatalog, newActionUnit.id, newActionUnit)
  const orOperator: EventBinding = {
    id: operatorId,
    name: 'and',
    type: EventBindingType.OPERATOR,
    children: actionUnit.children,
  }
  const newBindings2 = insert(newBindings, operatorId, orOperator)

  return newBindings2
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPassedAssertions(actionProps: ActionProps, value: any) {
  const { actionBinding, eventBindingSchema } = actionProps
  const newBindings = addRootOperator(eventBindingSchema.data, actionBinding.id)

  const validate = bindAssertions(eventAssertionBindingMetaCatalog, newBindings, operatorId)

  const errors = validate?.(value, { payload: actionProps, path: '' })

  return !errors
}
