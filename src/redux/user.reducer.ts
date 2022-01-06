import * as CONSTANTS from './user.constants'
import { combineReducers } from 'redux'
import { UserState } from '@/types/redux-state'
import { createAPIReducer } from '@/utils/create-api-reducer'

const getListInitialState: UserState['getList'] = {
  data: {
    total: 0,
    items: [],
  },
  loading: false,
  error: '',
}

const createInitialState: UserState['create'] = {
  data: null,
  loading: false,
  error: '',
}

export const user = combineReducers({
  getList: createAPIReducer(getListInitialState, CONSTANTS.GET_LIST),
  create: createAPIReducer(createInitialState, CONSTANTS.CREATE),
})
