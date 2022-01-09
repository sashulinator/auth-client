import { User } from './entities'
import { FindManyResponse, ServerCollectableError } from './transfer'

export interface RootState {
  user: UserState
}

export interface UserState {
  getList: {
    loading: boolean
    data: FindManyResponse<User>
    error: string
  }
  create: {
    loading: boolean
    data: User | null
    error: string
    validationErrors: Record<keyof User, ServerCollectableError> | null
  }
  update: {
    loading: boolean
    data: User | null
    error: string
    validationErrors: Record<keyof User, ServerCollectableError> | null
  }
}
