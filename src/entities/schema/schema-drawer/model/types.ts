import { ActionItem } from '../lib/action-list'
import { EventItem } from '../lib/event-list'
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

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
  NumberField = 'NumberField',
  Dropdown = 'Dropdown',
  Checkbox = 'Checkbox',
}

export interface EventProps {
  context: ComponentContext
  actionUnits: Norm<EventUnit>
  actionItems: ActionItem[]
  eventItem: EventItem
  eventUnit: EventUnit
  bindings: Norm<EventUnit>
}

export interface ActionProps extends EventProps {
  actionItem: ActionItem[]
  actionUnit: EventUnit
}

export interface Item {
  type: string
  // второй аргумент в ассёршене это объект который сабмитит схема
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: ((input: unknown, values: any) => void) | ((input: unknown, value: any, values: any) => void)
  schema?: Schema
}
