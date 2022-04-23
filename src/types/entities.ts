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

export interface SchemaItem {
  name: string
  formItemPropsSchemaId: string
  id: string
  path: string
  defaultValue: string
  type: string
  props?: Record<string, unknown>
  children?: SchemaItem[] | string[]
}

export type NormSchema = SchemaItem & {
  children?: SchemaItem[]
}

export interface CreateUserInput extends Omit<CreateInput<User>, 'phone'> {
  username: string
  password: string
}

export interface UpdateUserInput extends Omit<UpdateInput<User>, 'phone'> {
  username: string
  password: string
}

// export type CreateUserInput = Omit<CreateInput<User>, 'phone'> & { username: string; password: string }
// export type UpdateUserInput = Omit<UpdateInput<User>, 'phone'> & { username: string; password: string }
