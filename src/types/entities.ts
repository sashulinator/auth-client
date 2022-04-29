import { CreateInput, UpdateInput } from './transfer'

export type Norm<T> = Record<string, T>

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
