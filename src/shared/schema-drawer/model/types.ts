import { Meta } from '@savchenko91/schema-validator'

import { Observer } from '../lib/observer'
import { FormState } from 'final-form'
import { FormRenderProps } from 'react-final-form'

export type Catalog<T> = Record<string, T>

export interface Schema<TItem> {
  // TODO rename units to items
  units: Catalog<TItem>
}

interface Injection {
  from: string
  to: string
}

/**
 * COMP
 */

export enum CompSchemaType {
  FORM = 'FORM',
  PRESET = 'PRESET',
  COMP = 'COMP',
}

export interface Comp {
  id: string
  compSchemaId: string
  name?: string
  title: string // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  props?: Record<string, unknown>
  children?: string[]
  validators?: AssertionSchema
  bindings?: Catalog<EventBindingSchemaItem>
  injections?: Injection[]
}

export interface CompSchema {
  id: string
  title: string
  type: CompSchemaType
  // TODO rename comps to items
  comps: Catalog<Comp>
  componentName: null | string
}

export type ComponentCompSchema = Omit<CompSchema, 'componentName'> & {
  componentName: string
}

export interface CompMeta {
  type: 'checkbox' | 'input' | 'content' // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

/**
 * BINDINGS
 */

export interface BindingSchemaItem {
  type: string
  id: string
  name: string
  children?: string[] // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
}

export interface BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (...args: any[]) => any
  schema?: CompSchema
}

/**
 * ASSERTION BINDINGS
 */

export enum AssertionSchemaItemType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export interface AssertionSchemaItem extends BindingSchemaItem {
  type: AssertionSchemaItemType
}

export enum EventToShowError {
  onVisited = 'onVisited',
  onInit = 'onInit',
  onTouched = 'onTouched',
  onSubmit = 'onSubmit',
}

export interface AssertionSchema extends Schema<AssertionSchemaItem> {
  eventToShowError: EventToShowError
}

/**
 * EVENT BINDINGS
 */

export enum EventSchemaItemType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
  ROOT = 'ROOT',
}

export interface EventBindingSchemaItem extends BindingSchemaItem {
  type: EventSchemaItemType
}

export interface EventProps {
  context: FieldComponentContext | ContentComponentContext
  actionUnits: Catalog<EventBindingSchemaItem>
  actionItems: ActionBindingMeta[]
  eventBindingsMeta: EventBindingMeta
  eventBindingSchemaItem: EventBindingSchemaItem
  // TODO Catalog<EventSchemaItem> будет заменен на EventBindingSchema когда
  // TODO у Comp будет переделан bindings параметр
  eventBindingSchema: Catalog<EventBindingSchemaItem> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitActions: (value: any) => void
}

export interface ActionProps extends EventProps {
  actionItem: ActionBindingMeta
  actionUnit: EventBindingSchemaItem
}

export interface EventBindingMeta extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (eventProps: EventProps) => (eventOrValue: any) => void
}

export interface ActionBindingMeta extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (actionProps: ActionProps, value: any) => void
}

export interface AssertionBindingItem extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: any, input2: any, meta: Meta) => void
}

export type EventAssertionMeta = Meta & { payload: ActionProps }

export interface EventAssertionBindingMeta extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: any, input2: any, meta: EventAssertionMeta) => void
}

/**
 * CONTEXT
 */

export type Context = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formState: FormState<any, any> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formProps: FormRenderProps<any, any> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fns?: Record<string, (...args: any[]) => any>
} & Record<string, unknown>

export type DrawerContext = Context & {
  comps: Catalog<Comp>
  compIds: string[]
  schemas: Catalog<CompSchema> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formStatePrev: FormState<any, any>
  fns: {
    setFetchedDataToContext: React.Dispatch<React.SetStateAction<Record<string, unknown>>> // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setComp: (comp: Comp) => void
  }
}

export type ComponentContext = DrawerContext & {
  comp: Comp
  schema: CompSchema
}

export type ContentComponentContext = ComponentContext & {
  observer: Observer
  fns: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // onClick: (...args: any[]) => void
  }
}

export type FieldComponentContext = ContentComponentContext
