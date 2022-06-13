import { Meta } from '@savchenko91/schema-validator'

import { Observer } from '../lib/observer'
import { FormState } from 'final-form'
import { FormRenderProps } from 'react-final-form'

export type Catalog<T> = Record<string, T>

export interface Schema<TItem> {
  catalog: Catalog<TItem>
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
  validators?: AssertionBindingSchema
  bindings?: Catalog<EventBinding>
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

export interface Binding {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BindingSchema<TItem extends Binding> extends Schema<TItem> {}

/**
 * ASSERTION BINDINGS
 */

export enum AssertionBindingType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export interface AssertionBinding extends Binding {
  type: AssertionBindingType
}

export interface AssertionBindingMeta extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: any, input2: any, meta: Meta) => void
}

export enum EventToShowError {
  onVisited = 'onVisited',
  onInit = 'onInit',
  onTouched = 'onTouched',
  onSubmit = 'onSubmit',
}

export interface AssertionBindingSchema extends BindingSchema<AssertionBinding> {
  eventToShowError: EventToShowError
}

/**
 * EVENT BINDINGS
 */

export enum EventType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
  ROOT = 'ROOT',
}

export interface EventBinding extends Binding {
  type: EventType
}

export interface EventEventBinding extends Binding {
  type: EventType.EVENT
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventBindingSchema extends BindingSchema<EventBinding> {}

export interface EventProps {
  eventBindingCatalog: Catalog<EventBinding>
  eventBinding: EventBinding
  eventBindingMeta: EventBindingMeta
  actionBindingCatalog: Catalog<EventBinding>
  context: FieldComponentContext | ContentComponentContext // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitActions: (value: any) => void
}

export interface ActionProps extends EventProps {
  actionBindingMeta: ActionBindingMeta
  // Нет, тут нет опечатки. Действительно actionBinding = EventBinding
  actionBinding: EventBinding
}

export interface EventBindingMeta extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (eventProps: EventProps) => (eventOrValue: any) => void
}

export interface ActionBindingMeta extends BindingMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (actionProps: ActionProps, value: any) => void
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
