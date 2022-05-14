export type Norm<T> = Record<string, T>

export interface History<Data> {
  prev: null | History<Data>
  next: null | History<Data>
  data: Data
}

export interface Comp {
  id: string
  compSchemaId: string
  name: string
  title: string
  defaultValue?: string
  props?: Record<string, unknown>
  children?: string[]
  validators?: Norm<ValidatorItem>
  events?: Norm<EventItem>
  injections?: Injection[]
}

interface Injection {
  from: 'string'
  to: 'string'
}

export type Schema = Omit<CompSchema, 'componentName'> & {
  componentName: null | string
}

export interface CompSchema {
  componentName: string
  id: string
  title: string
  type: FormType
  comps: Record<string, Comp>
}

export enum FormType {
  FORM = 'FORM',
  PRESET = 'PRESET',
  COMP = 'COMP',
}

export interface BindingItem {
  id: string
  name: string
  children: string[]
  props?: unknown
}

export interface ValidatorItem extends BindingItem {
  type: ValidatorItemType
}

export enum ValidatorItemType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export interface EventItem extends BindingItem {
  type: EventItemType
}

export enum EventItemType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}
