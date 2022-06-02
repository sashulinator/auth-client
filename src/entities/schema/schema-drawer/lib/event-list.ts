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
  const { context, actionUnits } = bindingParams

  return context.formProps.form.subscribe(
    (state) => {
      const difference = diff(context.formStatePrev.values, state.values)

      if (!isEmpty(difference)) {
        // TODO в другом месте это должно быть
        context.formStatePrev.values = state.values

        Object.values(actionUnits).forEach((actionUnit) => {
          const actionItem = actionList[actionUnit.name]
          assertNotUndefined(actionItem)
          actionItem?.function({ ...bindingParams, actionUnit, actionItem }, difference)
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
