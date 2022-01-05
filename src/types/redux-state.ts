import { User } from './entities'
import { FindManyResponse } from './transfer'

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
  }
}
