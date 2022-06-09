import { assertNotUndefined } from '@savchenko91/schema-validator'

import { EventProps } from '../model/types'

export function onFieldChange(eventProps: EventProps) {
  const { context, emitActions } = eventProps
  assertNotUndefined(context.comp.name)

  return context.fns.onFieldChange(context.comp.name, emitActions)
}

export function onInit(eventProps: EventProps) {
  const { context, emitActions } = eventProps
  assertNotUndefined(context.comp.name)

  const value = context.formProps.form.getFieldState(context.comp.name)?.value

  emitActions(value)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {}
}

export function onFieldLife(eventProps: EventProps) {
  setTimeout(() => onInit(eventProps))
  return onFieldChange(eventProps)
}
