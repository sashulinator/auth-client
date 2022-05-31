import { assertNotUndefined } from '@savchenko91/schema-validator'

import { DrawerContext } from '../model/types'
import { FieldComponentProps } from '../ui/field-component'
import actionList from './action-list'
import { eventList } from './event-list'

import { BindingItem, BindingItemType, Norm } from '@/entities/schema'
import { findEntities } from '@/lib/entity-actions'

export default function createEventsFactory(context: DrawerContext) {
  return function eventFactory(props: Omit<FieldComponentProps, 'context'>) {
    const { bindings } = props.comp

    if (!bindings) {
      return
    }

    const eventBindings = getEventBindings(bindings)

    eventBindings.forEach((eventBinding) => {
      const eventItem = eventList[eventBinding.name]
      assertNotUndefined(eventItem)

      const actionBindings = findEntities(eventBinding.children || [], bindings)

      const actionItems = Object.values(actionBindings)?.map((actionBinding) => {
        const actionItem = actionList[actionBinding.name]
        assertNotUndefined(actionItem)
        return actionItem
      })

      const unsubscribe = eventItem?.function({
        ...props,
        context,
        actionBindings,
        eventBinding,
        actionItems,
        eventItem,
        bindings,
      })

      context.eventUnsubscribers.push(unsubscribe)
    })
  }
}

function getEventBindings(bindings: Norm<BindingItem>): BindingItem[] {
  return Object.values(bindings).filter((binding) => binding.type === BindingItemType.EVENT)
}
