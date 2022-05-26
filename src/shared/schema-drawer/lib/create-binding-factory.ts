import { DrawerContext } from '../model/types'
import actionList, { ActionItem } from './action-list'
import { eventList } from './event-list'

import { ROOT_ID } from '@/constants/common'
import { BindingItem, BindingItemType, Norm } from '@/entities/schema'

export default function createEventsFactory(context: DrawerContext) {
  return function eventFactory(bindings?: Norm<BindingItem>) {
    if (!bindings) {
      return
    }

    const root = bindings[ROOT_ID] as BindingItem

    if (!root) {
      return
    }

    const event = bindings[root?.children?.[0] || '']

    if (event === undefined) {
      return
    }

    const eventItem = eventList[event.name]

    const actionItems = Object.values(bindings).reduce<ActionItem[]>((acc, binding) => {
      binding.type === BindingItemType.ACTION
      const actionItem = actionList[binding.name] as ActionItem
      acc.push(actionItem)
      return acc
    }, [])

    eventItem?.function(context, actionItems, event.props)
  }
}
