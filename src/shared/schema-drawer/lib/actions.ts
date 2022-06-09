import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

import buildObject from '@/lib/build-object'

export function setValue(actionProps: ActionProps, value: any) {
  const { actionUnit, context } = actionProps
  const eventFieldName = actionUnit.props.name

  context.formProps.form.change(eventFieldName, value)
}

export function changeComponentProp(actionProps: ActionProps, eventFieldValue: any) {
  const { actionUnit, context } = actionProps
  const comp = context.comps[actionUnit?.props?.compId]
  assertNotUndefined(comp)

  let newComp = comp

  if (actionUnit?.props.typeof === 'boolean') {
    newComp = buildObject(comp, actionUnit.props.prop, actionUnit.props.booleanValue)
  }
  if (actionUnit?.props.typeof === 'undefined') {
    newComp = buildObject(comp, actionUnit.props.prop, undefined)
  }
  if (actionUnit?.props.typeof === 'current field value') {
    newComp = buildObject(comp, actionUnit.props.prop, eventFieldValue)
  }

  context.fns.setComp(newComp)
}
