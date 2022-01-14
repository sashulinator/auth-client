import { APIActionAlt, REDUX_API_MIDDLEWARE as type } from '@savchenko91/rc-redux-api-mw'

import { OnStage, ServerError } from '../types/transfer'
import CONSTANTS from './user.constants'

import { CreateUserInput, UpdateUserInput } from '@/types/entities'

const USER_LIST_CACHE_KEY = 'userList'

interface GetListParams {
  perPage: number
  currentPage: number
  searchQuery?: string
}

export function getList(params: GetListParams, onStage?: OnStage): APIActionAlt {
  const { perPage, currentPage, searchQuery } = params

  const skip = params.perPage * (params.currentPage - 1)

  return {
    url: '/api/v1/users',
    query: { skip, take: perPage, searchQuery: searchQuery },
    payload: { currentPage },
    method: 'GET',
    stageActionTypes: CONSTANTS.GET_LIST,
    type,
    cashe: {
      name: USER_LIST_CACHE_KEY,
      key: currentPage,
      expiresIn: 200_000,
    },
    ...onStage,
  }
}

export function create(body: CreateUserInput, onStage?: OnStage<ServerError>): APIActionAlt<ServerError> {
  return {
    url: `/api/v1/users`,
    method: 'POST',
    body,
    stageActionTypes: CONSTANTS.CREATE,
    clearCacheByKey: USER_LIST_CACHE_KEY,
    type,
    ...onStage,
  }
}

export function update(body: UpdateUserInput, onStage?: OnStage<ServerError>): APIActionAlt<ServerError> {
  return {
    url: `/api/v1/users`,
    method: 'PUT',
    body,
    stageActionTypes: CONSTANTS.UPDATE,
    clearCacheByKey: USER_LIST_CACHE_KEY,
    type,
    ...onStage,
  }
}

export function pruneMany(body: string[], onStage?: OnStage): APIActionAlt {
  return {
    url: `/api/v1/users`,
    method: 'DELETE',
    body,
    stageActionTypes: CONSTANTS.PRUNE_MANY,
    type,
    ...onStage,
  }
}
