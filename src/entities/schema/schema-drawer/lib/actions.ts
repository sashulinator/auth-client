import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'
import bindAssertions from './bind-assertions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(bindingParams: ActionProps, difference: Record<string, unknown>) {
  const { actionBinding, context, comp, bindings } = bindingParams
  const eventFieldName = actionBinding.props.name as string
  const eventFieldValue = difference[comp.name]

  if (actionBinding.children?.[0]) {
    const validate = bindAssertions(bindings, actionBinding?.children?.[0])
    const errors = validate?.(eventFieldValue, { payload: bindingParams } as Meta)

    if (errors) {
      return
    }
  }

  if (comp.name in difference) {
    context.formProps.form.change(eventFieldName, eventFieldValue)
  }
}
