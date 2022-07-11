import { Meta } from '@savchenko91/schema-validator'

import { Observer } from '../lib/observer'
import { FormApi, FormState } from 'final-form'

export type Dictionary<T> = Record<string, T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Package<Data = any> = {
  data: Data
}

export interface Schema<TItem> {
  data: Dictionary<TItem>
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
  FORM_DIMENSION = 'FORM_DIMENSION',
}

export interface Comp {
  id: string
  compSchemaId: string
  name?: string
  undefinedOnDestroy?: boolean
  title: string // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  props?: Record<string, unknown>
  children?: string[]
  assertionBindingSchema?: AssertionBindingSchema
  eventBindingSchema?: EventBindingSchema
  injections?: Injection[]
}

export interface LinkedComp {
  id: string
  title: string
  linkedSchemaId: string
  props?: {
    required: boolean
    multiselect: boolean
  }
}

export interface CompSchema extends Schema<Comp | LinkedComp> {
  screenReadOnly?: boolean
  workflowName?: string
  id: string
  title: string
  type: CompSchemaType
  componentName: null | string
}

export type CreateCompSchema = Omit<CompSchema, 'id'>

export type ComponentCompSchema = Omit<CompSchema, 'componentName'> & {
  componentName: string
}

export interface CompMeta {
  type: 'checkbox' | 'input' | 'content' // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
  iconName: string
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
  ROOT = 'ROOT',
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

export enum EventBindingType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  EVENT_ASSERTION = 'EVENT_ASSERTION',
  ROOT = 'ROOT',
}

export interface EventBinding extends Binding {
  type: EventBindingType
}

export interface EventEventBinding extends Binding {
  type: EventBindingType.EVENT
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventBindingSchema extends BindingSchema<EventBinding> {}

export interface EventProps {
  eventBindingSchema: EventBindingSchema
  eventBindingCatalog: Dictionary<EventBinding>
  eventBinding: EventBinding
  eventBindingMeta: EventPackageProperties
  actionBindingCatalog: Dictionary<EventBinding>
  context: FieldComponentContext | ContentComponentContext // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitActions: (value: any) => void
}

export interface ActionProps extends EventProps {
  actionBindingMeta: ActionBindingMeta
  // Нет, тут нет опечатки. Действительно actionBinding = EventBinding
  actionBinding: EventBinding
}

export interface EventPackageProperties extends BindingMeta {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (eventProps: EventProps) => (eventOrValue: any) => void
}

export interface ActionBindingMeta extends BindingMeta {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (actionProps: ActionProps, value: any) => void
}

export type EventAssertionMeta = Meta & { payload: ActionProps }

export enum EventAssertionBindingMetaName {
  undefined = 'undefined',
  visited = 'visited',
  matchPattern = 'matchPattern',
}

export interface EventAssertionBindingMeta extends BindingMeta {
  name: EventAssertionBindingMetaName
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: any, input2: any, meta: EventAssertionMeta) => void
}

/**
 * CONTEXT
 */

export type Context = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<any, any> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fns?: Record<string, (...args: any[]) => any>
} & Record<string, unknown>

export type DrawerContext = Context & {
  comps: Dictionary<Comp | LinkedComp>
  schema: CompSchema | CreateCompSchema
  compIds: string[]
  schemas: Dictionary<CompSchema> // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formStatePrev: FormState<any, any>
  fns: {
    setFetchedDataToContext: React.Dispatch<React.SetStateAction<Record<string, unknown>>> // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setComp: (comp: Comp | LinkedComp) => void
  }
}

export type ComponentContext = DrawerContext & {
  observer: Observer
  comp: Comp
  compSchema: CompSchema
}

export type ContentComponentContext = ComponentContext & {
  fns: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // onClick: (...args: any[]) => void
  }
}

export type FieldComponentContext = ContentComponentContext
