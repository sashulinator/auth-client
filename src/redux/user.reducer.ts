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

const createInitialState: UserState['create'] = {
  data: null,
  loading: false,
  error: '',
}

function create(
  state = createInitialState,
  action: StageAction<{ error?: string } & User>
): typeof createInitialState {
  switch (action.type) {
    case CONSTANTS.CREATE?.START:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case CONSTANTS.CREATE?.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.body?.error || '',
      }
    case CONSTANTS.CREATE?.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.body || createInitialState.data,
      }
    default:
      return createInitialState
  }
}

export const user = combineReducers({ getList, create })
