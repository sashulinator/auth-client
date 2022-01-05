import * as CONSTANTS from './user.constants'
import { combineReducers } from 'redux'
import { StageAction } from '@savchenko91/rc-redux-api-mw'
import { UserState } from '@/types/redux-state'
import { FindManyResponse } from '@/types/transfer'
import { User } from '@/types/entities'

const getListInitialState: UserState['getList'] = {
  data: {
    total: 0,
    items: [],
  },
  loading: false,
  error: '',
}

function getList(
  state = getListInitialState,
  action: StageAction<{ error?: string } & FindManyResponse<User>>
): typeof getListInitialState {
  switch (action.type) {
    case CONSTANTS.GET_LIST?.START:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case CONSTANTS.GET_LIST?.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.body?.error || '',
      }
    case CONSTANTS.GET_LIST?.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.body || getListInitialState.data,
      }
    default:
      return getListInitialState
  }
}

export const user = combineReducers({ getList })
