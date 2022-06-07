import { ActionProps } from '../model/types'

interface SetValueProps {
  name: string
}

export function setValue(actionProps: ActionProps, value: SetValueProps) {
  const { actionUnit, context } = actionProps
  const eventFieldName = actionUnit.props.name

  context.formProps.form.change(eventFieldName, value)
}
