import { ActionItem } from '../lib/action-list'
import { EventItem } from '../lib/event-list'
import { FormState } from 'final-form'
import { FormRenderProps } from 'react-final-form'

import { BindingItem, Comp, Norm, Schema } from '@/entities/schema'

export type Context = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formState: FormState<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formProps: FormRenderProps<any, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fns?: Record<string, (...args: any[]) => any>
} & Record<string, unknown>

export type DrawerContext = Context & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formStatePrev: FormState<any, any>
  eventUnsubscribers: (() => void)[]
}

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
  NumberField = 'NumberField',
}

export interface EventProps {
  comp: Comp
  schema: Schema
  schemas: Norm<Schema>
  context: DrawerContext
  actionBindings: Norm<BindingItem>
  actionItems: ActionItem[]
  eventItem: EventItem
  eventBinding: BindingItem
  bindings: Norm<BindingItem>
}

export interface ActionProps extends EventProps {
  actionItem: ActionItem[]
  actionBinding: BindingItem
}
