export interface Comp {
  id: string
  compSchemaId: string
  compName: string
  name: string
  type: string
  path: string
  // дефвалуе вынести в пропс и юзер не должен в пас писать слово пропс для формы элемента
  defaultValue?: string
  props?: Record<string, unknown>
  childCompIds?: string[]
}

export interface Schema {
  id: string
  name: string
  type: string
  description: string
  comps: Record<string, Comp>
}

export type Norm<T> = Record<string, T>
