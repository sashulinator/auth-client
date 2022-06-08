import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

import buildObject from '@/lib/build-object'

export function setValue(actionProps: ActionProps, value: any) {
  const { actionUnit, context } = actionProps
  const eventFieldName = actionUnit.props.name

  context.formProps.form.change(eventFieldName, value)
}

export function changeComponentProp(actionProps: ActionProps, value: any) {
  const { actionUnit, context } = actionProps
  const comp = context.comps[actionUnit?.props?.compId]
  assertNotUndefined(comp)

  const newComp = buildObject(comp, actionUnit.props.prop, value)

  context.fns.setComp(newComp)
}
