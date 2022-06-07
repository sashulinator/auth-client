import { assertNotUndefined } from '@savchenko91/schema-validator'

import { actionList } from '../constants/action-list'
import { EventProps } from '../model/types'

export function onFieldChange(eventProps: EventProps) {
  const { context, actionUnits } = eventProps
  assertNotUndefined(context.comp.name)

  return context.fns.onFieldChange(context.comp.name, (value) => {
    Object.values(actionUnits).forEach((actionUnit) => {
      const actionItem = actionList[actionUnit.name]
      assertNotUndefined(actionItem)
      actionItem?.function({ ...eventProps, actionUnit, actionItem }, value)
    })
  })
}
