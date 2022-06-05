import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

type EventAssertionMeta = Meta & { payload: ActionProps }

export function _undefined(value: unknown, meta: EventAssertionMeta) {
  const { actionUnit, context } = meta.payload
  const eventFieldName = actionUnit.props.name as string
  const isInit = actionUnit.props.isInit as boolean
  const targetValue = context.formProps.form.getFieldState(eventFieldName)?.[isInit ? 'initial' : 'value']

  if (targetValue !== undefined) {
    throw new Error('Target init value is not undefined!')
  }
}
