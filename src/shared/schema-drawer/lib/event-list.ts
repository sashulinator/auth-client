import { IDropdownOption } from '@fluentui/react'
import { isEmpty } from '@savchenko91/schema-validator'

import { DrawerContext } from '../model/types'
import { ActionItem } from './action-list'
import diff from 'object-diff'

import { Norm, Schema } from '@/entities/schema'

export interface EventItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...ars: any[]) => any
  name: string
  schema?: Schema
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onChange(context: DrawerContext, actionItems: ActionItem[], props?: any) {
  context.formProps.form.subscribe(
    (state) => {
      const difference1 = diff(context.formStatePrev.values, state.values)
      const difference2 = diff(context.formStatePrev.values, state.values)
      const difference = isEmpty(difference1) ? difference2 : difference1

      console.log('aaaa', difference)
      if (!isEmpty(difference)) {
        context.formStatePrev.values = state.values
        actionItems.forEach((actionItem) => {
          actionItem?.function(context, { ...props, difference })
        })
      }
    },
    {
      values: true,
    }
  )
  return
}

export const eventList: Norm<EventItem> = {
  onChange: {
    name: 'onChange',
    function: onChange,
  },
}

export const eventNameOptions: IDropdownOption[] = Object.keys(eventList).map((eventName) => {
  return {
    key: eventName,
    text: eventName,
  }
})
