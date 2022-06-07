import { assertNotUndefined } from '@savchenko91/schema-validator'

import { EventProps } from '../model/types'

export function onFieldChange(eventProps: EventProps) {
  const { context, emitActions } = eventProps
  assertNotUndefined(context.comp.name)

  return context.fns.onFieldChange(context.comp.name, emitActions)
}
