import { APIActionAlt, REDUX_API_MIDDLEWARE as type } from '@savchenko91/rc-redux-api-mw'

import { OnStage, ServerError } from '../types/transfer'
import { initStateWithDataAsObject } from './common'
import { combineReducers } from 'redux'

import { Credentials } from '@/types/entities'
import { AuthState, RootState } from '@/types/redux-state'
import { createAPIconstants } from '@/utils/create-api-constants'
import { createAPIReducer } from '@/utils/create-api-reducer'

export const constants = createAPIconstants('auth', 'LOGIN')

export const reducers = combineReducers({
  login: createAPIReducer(initStateWithDataAsObject, constants.LOGIN),
})

export const selectors = {
  login: (s: RootState): AuthState['login'] => s.auth.login,
}

export const actions = {
  login(body: Credentials, onStage?: OnStage<ServerError>): APIActionAlt<ServerError> {
    return {
      url: `/api/v1/local-auth`,
      method: 'POST',
      body,
      stageActionTypes: constants.LOGIN,
      type,
      ...onStage,
    }
  },
}
