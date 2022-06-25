import { assertNotUndefined } from '@savchenko91/schema-validator'

import { EventProps } from '../model/types'

export function onFieldChange(eventProps: EventProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: any) => {
    const { context, emitActions } = eventProps
    assertNotUndefined(context.comp.name)

    emitActions(value)
  }
}

export function onInit(eventProps: EventProps) {
  return () => {
    const { context, emitActions } = eventProps
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    emitActions(value)
  }
}

export function onFieldLife(eventProps: EventProps) {
  const { context } = eventProps

  context.observer.addEvent(onInit.name, () => {
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    const { emitActions } = eventProps
    emitActions(value)
  })

  context.observer.addEvent(onFieldChange.name, () => {
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    const { emitActions } = eventProps
    emitActions(value)
  })

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {}
}

export function onBlur(eventProps: EventProps) {
  return () => {
    const { emitActions, context } = eventProps
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    emitActions(value)
  }
}

export function onClick(eventProps: EventProps) {
  return () => {
    const { emitActions, context } = eventProps
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    emitActions(value)
  }
}

export function onFocus(eventProps: EventProps) {
  return () => {
    const { emitActions, context } = eventProps
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    emitActions(value)
  }
}

export function onChange(eventProps: EventProps) {
  return () => {
    const { emitActions, context } = eventProps
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    emitActions(value)
  }
}

export function onDestroy(eventProps: EventProps) {
  return () => {
    const { emitActions, context } = eventProps
    assertNotUndefined(context.comp.name)
    const value = context.form.getFieldState(context.comp.name)?.value
    emitActions(value)
  }
}
