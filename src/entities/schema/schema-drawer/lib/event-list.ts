import { IDropdownOption } from '@fluentui/react'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { Norm, Schema, actionList } from '../..'
import { EventProps } from '../model/types'

export interface EventItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (ars: EventProps) => any
  name: string
  schema?: Schema
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onChange(bindingParams: EventProps) {
  const { context, actionUnits } = bindingParams
  assertNotUndefined(context.comp.name)

  return context.fns.onFieldChange(context.comp.name, (value) => {
    Object.values(actionUnits).forEach((actionUnit) => {
      const actionItem = actionList[actionUnit.name]
      assertNotUndefined(actionItem)
      actionItem?.function({ ...bindingParams, actionUnit, actionItem }, value)
    })
  })
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
