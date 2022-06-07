import { Meta } from '@savchenko91/schema-validator'

import { FormState } from 'final-form'
import { FormRenderProps } from 'react-final-form'

import { Comp, EventUnit, Norm, Schema } from '@/entities/schema'

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
  comps: Norm<Comp>
  compIds: string[]
  schemas: Norm<Schema>
  eventUnsubscribers: (() => void)[]
  fns: {
    setFetchedDataToContext: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFieldChange: (name: string, action: (difference: any) => void) => () => void
  }
}

export type ComponentContext = DrawerContext & {
  comp: Comp
  schema: Schema
}

export interface EventProps {
  context: ComponentContext
  actionUnits: Norm<EventUnit>
  actionItems: ActionListItem[]
  eventItem: EventListItem
  eventUnit: EventUnit
  bindings: Norm<EventUnit>
}

export interface ActionProps extends EventProps {
  actionItem: ActionListItem
  actionUnit: EventUnit
}

export interface ListItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...args: any[]) => any
  schema?: Schema
}

export interface EventListItem extends ListItem {
  function: (eventProps: EventProps) => () => void
}

export interface ActionListItem extends ListItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (actionProps: ActionProps, value: any) => void
}

export interface AssertionListItem extends ListItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: any, input2: any, meta: Meta) => void
}

export type EventAssertionMeta = Meta & { payload: ActionProps }

export interface EventAssertionListItem extends ListItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: any, input2: any, meta: EventAssertionMeta) => void
}
