import { FormApi } from 'final-form'

import { FormSchemaItem } from '@/types/entities'

export interface ActionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<Record<string, any>, Partial<Record<string, any>>>
  schemaItem: FormSchemaItem
  schemaItems?: FormSchemaItem[]
  value?: unknown
  event?: unknown
}

export type ActionFunc = (props: ActionProps) => unknown

export function runAction(actionName: string, props: ActionProps) {
  // TODO schemaItems сейчас для всех байндингов, сделать для каждого отдельно
  const { schemaItem, schemaItems, form } = props
  return (event?: unknown) => {
    setTimeout(() => {
      const value = form.getFieldState(schemaItem.path)?.value

      props.schemaItem.bindings?.forEach((binding) => {
        if (binding.events.includes(actionName)) {
          binding.actions.reduce((newValue, action) => {
            return hashActions[action]?.({ schemaItem, schemaItems, form, event, value: newValue })
          }, value)
        }
      })
    })
  }
}

export const setValue: ActionFunc = ({ form, schemaItems, value }) => {
  schemaItems?.forEach((item) => {
    form.change(item.path, value)
  })

  return value
}

export const hashActions: Record<string, ActionFunc> = {
  setValue,
}
