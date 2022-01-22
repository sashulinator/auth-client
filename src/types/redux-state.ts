import { User } from './entities'
import { FindManyResponse, ServerCollectableError } from './transfer'

export interface RootState {
  user: UserState
  auth: AuthState
}

export interface UserState {
  getList: {
    data: FindManyResponse<User>
    loading: boolean
    error: string
    currentPage: number
    abortController: AbortController
  }
  create: {
    data: User | null
    loading: boolean
    error: string
    validationErrors: Record<keyof User, ServerCollectableError> | null
  }
  update: {
    data: User | null
    loading: boolean
    error: string
    validationErrors: Record<keyof User, ServerCollectableError> | null
  }
}

export interface AuthState {
  login: {
    loading: boolean
    error: string
    validationErrors: Record<keyof User, ServerCollectableError> | null
  }
}
