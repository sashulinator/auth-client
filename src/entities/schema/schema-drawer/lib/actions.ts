import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'
import bindAssertions from './bind-assertions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(bindingParams: ActionProps, difference: Record<string, unknown>) {
  const { actionUnit, context, bindings } = bindingParams
  const eventFieldName = actionUnit.props.name as string
  const eventFieldValue = difference[context.comp.name]

  if (actionUnit.children?.[0]) {
    const validate = bindAssertions(bindings, actionUnit?.children?.[0])
    const errors = validate?.(eventFieldValue, { payload: bindingParams } as Meta)

    if (errors) {
      return
    }
  }

  if (context.comp.name in difference) {
    context.formProps.form.change(eventFieldName, eventFieldValue)
  }
}
