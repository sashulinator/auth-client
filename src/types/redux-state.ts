export interface RootState {
  user: UserState
}

export interface UserState {
  getList: {
    loading: boolean
    data: {
      items: []
      total: number
    }
    error: string
  }
}
