import { ServerError } from '../types/transfer'
import { initStateWithDataAsObject } from './common'
import { combineReducers } from 'redux'

import { Credentials, User } from '@/types/entities'
import { AuthState, RootState } from '@/types/redux-state'
import { RawAPIAction, createApiActions } from '@/utils/create-api-actions'
import { createAPIconstants } from '@/utils/create-api-constants'
import { createAPIReducer } from '@/utils/create-api-reducer'

export const constants = createAPIconstants('auth', 'LOGIN')

export const reducers = combineReducers({
  login: createAPIReducer(initStateWithDataAsObject, constants.LOGIN),
})

export const selectors = {
  login: (s: RootState): AuthState['login'] => s.auth.login,
}

const rawActions = {
  login(body: Credentials): RawAPIAction<ServerError & User> {
    return {
      url: `/api/v1/local-auth`,
      method: 'POST',
      body,
    }
  },
}

export const actions = createApiActions('auth', rawActions)
