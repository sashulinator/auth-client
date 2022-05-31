import { IDropdownOption } from '@fluentui/react'
import { assertNotUndefined, isEmpty } from '@savchenko91/schema-validator'

import { EventProps } from '../model/types'
import actionList from './action-list'
import { diff } from 'deep-object-diff'

import { Norm, Schema } from '@/entities/schema'

export interface EventItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (ars: EventProps) => any
  name: string
  schema?: Schema
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onChange(bindingParams: EventProps) {
  const { context, actionBindings } = bindingParams

  return context.formProps.form.subscribe(
    (state) => {
      const difference = diff(context.formStatePrev.values, state.values)

      if (!isEmpty(difference)) {
        context.formStatePrev.values = state.values

        Object.values(actionBindings).forEach((actionBinding) => {
          const actionItem = actionList[actionBinding.name]
          assertNotUndefined(actionItem)
          actionItem?.function({ ...bindingParams, actionBinding, actionItem }, difference)
        })
      }
    },
    {
      values: true,
    }
  )
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
