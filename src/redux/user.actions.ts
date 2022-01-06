import { User } from '@/types/entities'
import {
  REDUX_API_MIDDLEWARE as type,
  APIActionAlt,
} from '@savchenko91/rc-redux-api-mw'
import { OnStage } from '../types/transfer'
import * as CONSTANTS from './user.constants'

export function getList(onStage?: OnStage): APIActionAlt {
  return {
    url: `/api/v1/users`,
    method: 'get',
    stageActionTypes: CONSTANTS.GET_LIST,
    type,
    ...onStage,
  }
}

export function create(body: User, onStage?: OnStage): APIActionAlt {
  return {
    url: `/api/v1/users`,
    method: 'post',
    body,
    stageActionTypes: CONSTANTS.CREATE,
    type,
    ...onStage,
  }
}
