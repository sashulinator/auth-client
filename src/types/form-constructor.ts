export interface Comp {
  id: string
  compSchemaId: string
  name: string
  path: string
  // дефвалуе вынести в пропс и юзер не должен в пас писать слово пропс для формы элемента
  defaultValue?: string
  props?: Record<string, unknown>
  childCompIds?: string[]
}

export interface Schema {
  componentName?: string
  id: string
  name: string
  type: string
  comps: Record<string, Comp>
}

export type Norm<T> = Record<string, T>
