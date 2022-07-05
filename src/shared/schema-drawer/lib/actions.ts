import { assertNotUndefined } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

import buildObject from '@/lib/build-object'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(actionProps: ActionProps, eventFieldValue: any) {
  const { actionBinding: actionUnit, context } = actionProps
  const eventFieldName = actionUnit.props?.name

  try {
    assertNotUndefined(actionUnit.props?.name)
  } catch (e) {
    // event was draged and droped
    return
  }

  context.form.change(eventFieldName, eventFieldValue)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setCompProp(actionProps: ActionProps, eventFieldValue: any) {
  const { actionBinding: actionUnit, context } = actionProps
  const comp = context.comps[actionUnit?.props?.compId]

  try {
    assertNotUndefined(comp)
    assertNotUndefined(actionUnit.props.prop)
  } catch (e) {
    // TODO сделать валидацию в validator-picker чтобы
    // TODO он внутри себя стейт хранил но не сохранял в schema если невалидно
    // event was draged and droped
    return
  }

  let newComp = comp

  if (actionUnit?.props.typeof === 'boolean') {
    newComp = buildObject(comp, actionUnit.props.prop, actionUnit.props.booleanValue)
  }
  if (actionUnit?.props.typeof === 'string') {
    newComp = buildObject(comp, actionUnit.props.prop, actionUnit.props.stringValue)
  }
  if (actionUnit?.props.typeof === 'undefined') {
    newComp = buildObject(comp, actionUnit.props.prop, undefined)
  }
  if (actionUnit?.props.typeof === 'current field value') {
    newComp = buildObject(comp, actionUnit.props.prop, eventFieldValue)
  }

  context.fns.setComp(newComp)
}

export function hide(actionProps: ActionProps, eventFieldValue: any) {
  const { actionBinding, context } = actionProps
  const comp = context.comps[actionBinding?.props?.compId]

  if (eventFieldValue === undefined || comp === undefined) {
    return
  }

  context.fns.setComp(buildObject(comp, 'props.hidden', !eventFieldValue))
}
