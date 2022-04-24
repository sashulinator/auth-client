import { FormApi } from 'final-form'

import { NormSchemaItem } from '@/types/entities'

export interface ActionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<Record<string, any>, Partial<Record<string, any>>>
  schemaItem: NormSchemaItem
  schemaItems?: NormSchemaItem[]
  value?: unknown
}

export type ActionFunc = (props: ActionProps) => unknown

export const setValue: ActionFunc = ({ form, schemaItems, value }) => {
  schemaItems?.forEach((item) => {
    form.change(item.path, value)
  })

  return value
}

export const hashActions: Record<string, ActionFunc> = {
  setValue,
}
