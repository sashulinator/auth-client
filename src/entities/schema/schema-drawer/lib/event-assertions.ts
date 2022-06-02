import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

type EventAssertionMeta = Meta & { payload: ActionProps }

export function assertTargetInitValueUndefined(value: unknown, meta: EventAssertionMeta) {
  const { actionBinding, context } = meta.payload
  const eventFieldName = actionBinding.props.name as string
  const targetInitValue = context.formProps.form.getFieldState(eventFieldName)?.initial

  if (targetInitValue !== undefined) {
    throw new Error('Target init value is not undefined!')
  }
}
