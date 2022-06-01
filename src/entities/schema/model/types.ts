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
  validators?: Norm<ValidatorItem>
  bindings?: Norm<BindingItem>
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

export interface BindingValidatorItem {
  id: string
  name: string
  children: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
}

export interface ValidatorItem extends BindingValidatorItem {
  type: ValidatorItemType
}

export enum ValidatorItemType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export interface BindingItem extends BindingValidatorItem {
  type: BindingItemType
}

export enum BindingItemType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
  ROOT = 'ROOT',
}
