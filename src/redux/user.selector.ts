import { RootState, UserState } from '@/types/redux-state'

export const getList = (s: RootState): UserState['getList'] => s.user.getList
export const create = (s: RootState): UserState['create'] => s.user.create
export const update = (s: RootState): UserState['create'] => s.user.update
