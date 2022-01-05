import * as CONSTANTS from './user.constants'
import { combineReducers } from 'redux'

const initialState = {
  data: {
    total: 0,
    items: [],
  },
  loading: false,
  error: '',
}

function getList(state = initialState, action: any) {
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
        error: action.payload?.body?.error || '',
      }
    case CONSTANTS.GET_LIST?.SUCCESS:
      console.log('success', CONSTANTS.GET_LIST?.SUCCESS)

      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.body || initialState.data,
      }
    default:
      return initialState
  }
}

export const user = combineReducers({ getList })
