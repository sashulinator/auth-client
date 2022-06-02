import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

type EventAssertionMeta = Meta & { payload: ActionProps }

export function assertTargetInitValueUndefined(value: unknown, meta: EventAssertionMeta) {
  const { actionUnit, context } = meta.payload
  const eventFieldName = actionUnit.props.name as string
  const targetInitValue = context.formProps.form.getFieldState(eventFieldName)?.initial

  if (targetInitValue !== undefined) {
    throw new Error('Target init value is not undefined!')
  }
}
