import { Meta } from '@savchenko91/schema-validator'

import { Observer } from '../lib/observer'
import { FormState } from 'final-form'
import { FormRenderProps } from 'react-final-form'

export type Norm<T> = Record<string, T>

export interface Schema {
  id: string
  title: string
  type: SchemaType
  comps: Norm<Comp>
  componentName: null | string
}

export type CompSchema = Omit<Schema, 'componentName'> & {
  componentName: string
}

export interface Comp {
  id: string
  compSchemaId: string
  name?: string
  title: string // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  props?: Record<string, unknown>
  children?: string[]
  validators?: Norm<AssertionUnit>
  bindings?: Norm<EventUnit>
  injections?: Injection[]
}

interface Injection {
  from: string
  to: string
}

export enum SchemaType {
  FORM = 'FORM',
  PRESET = 'PRESET',
  COMP = 'COMP',
}

export interface ComponentItem {
  type: 'checkbox' | 'input' | 'content' // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

/**
 * BINDINGS
 */

export interface BindingSchema<TUnit> {
  type: string
  units: Norm<TUnit>
}

export interface BindingUnit {
  id: string
  name: string
  children?: string[] // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
}

/**
 * ASSERTION BINDINGS
 */

export enum AssertionUnitType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export interface AssertionUnit extends BindingUnit {
  type: AssertionUnitType
}

export interface AssertionSchema extends BindingSchema<AssertionUnit> {
  type: 'ASSERTION'
  eventToShowError: string
}

/**
 * EVENT BINDINGS
 */

export enum EventUnitType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
  ROOT = 'ROOT',
}

export interface EventUnit extends BindingUnit {
  type: EventUnitType
}

// CONTEXT

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
  fns: {
    setFetchedDataToContext: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setComp: (comp: Comp) => void
  }
}

export type ComponentContext = DrawerContext & {
  comp: Comp
  schema: Schema
}

export type ContentComponentContext = ComponentContext & {
  observer: Observer
  fns: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // onClick: (...args: any[]) => void
  }
}

export type FieldComponentContext = ContentComponentContext

export interface EventProps {
  context: FieldComponentContext | ContentComponentContext
  actionUnits: Norm<EventUnit>
  actionItems: ActionListItem[]
  eventItem: EventListItem
  eventUnit: EventUnit
  bindings: Norm<EventUnit>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitActions: (value: any) => void
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
  function: (eventProps: EventProps) => (eventOrValue: any) => void
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
