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
  validators?: Norm<AssertionUnit>
  bindings?: Norm<EventUnit>
  injections?: Injection[]
}

interface Injection {
  from: 'string'
  to: 'string'
}

export enum SchemaType {
  FORM = 'FORM',
  PRESET = 'PRESET',
  COMP = 'COMP',
}

export interface BindingUnit {
  id: string
  name: string
  children: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
}

export interface AssertionUnit extends BindingUnit {
  type: AssertionUnitType
}

export enum AssertionUnitType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export interface EventUnit extends BindingUnit {
  type: EventUnitType
}

export enum EventUnitType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
  ROOT = 'ROOT',
}
