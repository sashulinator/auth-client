import { CreateUserInput, UpdateUserInput } from '@/types/entities'
import { REDUX_API_MIDDLEWARE as type, APIActionAlt } from '@savchenko91/rc-redux-api-mw'
import { OnStage, ServerError } from '../types/transfer'
import CONSTANTS from './user.constants'

interface GetListParams {
  perPage: number
  currentPage: number
  searchQuery?: string
}

export function getList(params: GetListParams, onStage?: OnStage): APIActionAlt {
  const skip = params.perPage * (params.currentPage - 1)

  return {
    url: '/api/v1/users',
    query: { skip, take: params.perPage, searchQuery: params.searchQuery },
    method: 'get',
    stageActionTypes: CONSTANTS.GET_LIST,
    type,
    ...onStage,
  }
}

export function create(body: CreateUserInput, onStage?: OnStage<ServerError>): APIActionAlt<ServerError> {
  return {
    url: `/api/v1/users`,
    method: 'post',
    body,
    stageActionTypes: CONSTANTS.CREATE,
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
