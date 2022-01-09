import { initStateWithDataAsEntityList, initStateWithDataAsObject } from './common'
import CONSTANTS from './user.constants'
import { combineReducers } from 'redux'

import { createAPIReducer } from '@/utils/create-api-reducer'

export const user = combineReducers({
  getList: createAPIReducer(initStateWithDataAsEntityList, CONSTANTS.GET_LIST),
  create: createAPIReducer(initStateWithDataAsObject, CONSTANTS.CREATE),
  update: createAPIReducer(initStateWithDataAsObject, CONSTANTS.UPDATE),
})
