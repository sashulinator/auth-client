import { CreateInput, UpdateInput } from './transfer'

export type User = {
  id: string
  username: string
  email: string
  name: string | null
  phone: string | null
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Credentials {
  username: string
  password: string
}

export interface CreateUserInput extends Omit<CreateInput<User>, 'phone'> {
  username: string
  password: string
}

export interface UpdateUserInput extends Omit<UpdateInput<User>, 'phone'> {
  username: string
  password: string
}

export interface BaseSchema {
  id: string
  name: string
  title: string
  description: string
}

export interface ComponentSchema extends BaseSchema {
  schema: ComponentSchemaItem[]
}

export interface BaseSchemaItem {
  id: string
  componentSchemaId: string
  name: string
  type: string
  path: string
  defaultValue?: string
  props?: Record<string, unknown>
}

export interface FormSchemaItem extends BaseSchemaItem {
  children?: FormSchemaItem[] | string[]
  bindings?: {
    events: string[]
    actions: string[]
    componentIds: string[]
  }[]
}

export interface ComponentSchemaItem extends BaseSchemaItem {
  children?: FormSchemaItem[] | string[]
}

export type NormSchemaItem = FormSchemaItem & {
  children?: FormSchemaItem[]
}
