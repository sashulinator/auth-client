import { AuthState, RootState } from '@/types/redux-state'

export const login = (s: RootState): AuthState['login'] => s.auth.login
