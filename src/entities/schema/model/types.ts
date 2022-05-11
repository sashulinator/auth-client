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
  // дефвалуе вынести в пропс и юзер не должен в пас писать слово пропс для формы элемента
  defaultValue?: string
  props?: Record<string, unknown>
  children?: string[]
  validators?: Norm<CompValidator>
  injections?: [
    {
      from: 'string'
      to: 'string'
    }
  ]
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

export interface CompValidator {
  id: string
  name: string
  children: string[]
  input2?: unknown
}

export interface CompBinding {
  id: string
  name: string
  children: string[]
}
