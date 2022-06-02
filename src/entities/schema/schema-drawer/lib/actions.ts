import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'
import bindAssertions from './bind-assertions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(bindingParams: ActionProps, value: Record<string, unknown>) {
  const { actionUnit, context, bindings } = bindingParams
  const eventFieldName = actionUnit.props.name as string

  if (actionUnit.children?.[0]) {
    const validate = bindAssertions(bindings, actionUnit?.children?.[0])
    const errors = validate?.(value, { payload: bindingParams } as Meta)

    if (errors) {
      return
    }
  }

  context.formProps.form.change(eventFieldName, value)
}
