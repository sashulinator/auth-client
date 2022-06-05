import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'
import bindAssertions from './bind-assertions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setValue(actionProps: ActionProps, value: Record<string, unknown>) {
  const { actionUnit, context, bindings } = actionProps
  const eventFieldName = actionUnit.props.name as string

  if (actionUnit.children?.[0]) {
    const validate = bindAssertions(bindings, actionUnit?.children?.[0])

    const errors = validate?.(value, { payload: actionProps } as Meta)

    if (errors) {
      return
    }
  }

  context.formProps.form.change(eventFieldName, value)
}
