import { APIActionAlt, REDUX_API_MIDDLEWARE as type } from '@savchenko91/rc-redux-api-mw'

import { OnStage, ServerError } from '../types/transfer'
import CONSTANTS from './auth.constants'

import { Credentials } from '@/types/entities'

export function login(body: Credentials, onStage?: OnStage<ServerError>): APIActionAlt<ServerError> {
  return {
    url: `/api/v1/local-auth`,
    method: 'POST',
    body,
    stageActionTypes: CONSTANTS.LOGIN,
    type,
    ...onStage,
  }
}
