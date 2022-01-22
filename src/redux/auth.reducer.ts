import CONSTANTS from './auth.constants'
import { initStateWithDataAsObject } from './common'
import { combineReducers } from 'redux'

import { createAPIReducer } from '@/utils/create-api-reducer'

export const auth = combineReducers({
  login: createAPIReducer(initStateWithDataAsObject, CONSTANTS.LOGIN),
})
