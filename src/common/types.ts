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
  componentName: null | string
  id: string
  name: string
  type: string
  comps: Record<string, Comp>
}

export type Norm<T> = Record<string, T>

export interface FindManyParams<T = number> {
  take?: T
  skip?: T
}

export interface SearchQuery {
  searchQuery?: string
}

export interface CreateUser {
  username: string
  password: string
  email: string
  fullname: string
}

export interface UpdateUser extends CreateUser {
  id: string
}
