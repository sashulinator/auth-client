import { APIAction, EndAction, REDUX_API_MIDDLEWARE, StageActionTypes } from '@savchenko91/rc-redux-api-mw'

import { Dispatch, Middleware } from 'redux'

const cache: {
  [cacheName: string]: {
    [cacheKey: string]: {
      [actionName in 'START' | 'SUCCESS']: APIAction
    } & { cacheId: number }
  }
} = {}

const waitingStageActionTypes: Record<string, StageActionTypes> = {}

const cacheMiddleware = (): Middleware<Dispatch<APIAction>> => {
  return (api) => (next) => async (action: APIAction & EndAction) => {
    if (action.clearCacheByKey) {
      delete cache[action.clearCacheByKey]
    }

    if (action.cashe) {
      const cacheValue = cache[action.cashe.name]?.[getCacheKey(action)]

      console.log(cacheValue)
      if (cacheValue && cacheValue.START && cacheValue.SUCCESS) {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await api.dispatch(cacheValue.START)
        // eslint-disable-next-line @typescript-eslint/await-thenable
        api.dispatch(cacheValue.SUCCESS)

        return action
      }

      waitingStageActionTypes[action.url] = action.stageActionTypes
    }

    const isSuccess = action.type === waitingStageActionTypes?.[action?.payload?.action?.url]?.SUCCESS
    const isStart = action.type === waitingStageActionTypes?.[action?.payload?.action?.url]?.START

    console.log('isStart || isSuccess', isStart, isSuccess)

    if (isStart || isSuccess) {
      const cacheKey = getCacheKey(action.payload.action)
      const cacheName = action.payload.action?.cashe?.name || ''

      if (isStart) {
        cache[cacheName] = {
          ...cache?.[cacheName],
          [cacheKey]: {
            ...cache[cacheName]?.[cacheKey],
            START: action,
          },
        }
      } else {
        cache[cacheName] = {
          ...cache?.[cacheName],
          [cacheKey]: {
            ...cache[cacheName]?.[cacheKey],
            SUCCESS: action,
          },
        }
      }

      if (cache[cacheName][cacheKey].cacheId) {
        clearTimeout(cache[cacheName][cacheKey].cacheId)
      }

      cache[cacheName][cacheKey].cacheId = window.setTimeout(() => {
        delete cache[cacheName][cacheKey]
      }, action.payload.action.cashe?.expiresIn)

      return next(action)
    }

    return next(action)
  }
}

function getCacheKey(action: APIAction): string {
  if (!action.cashe) {
    return ''
  }

  const isPrimitiv = typeof action.cashe.key === 'string' && typeof action.cashe.key === 'number'
  const cacheKey = isPrimitiv ? action.cashe.key.toString() : JSON.stringify(action.cashe.key)
  return `${cacheKey}${action.url.split('?')[0]}`
}

export default cacheMiddleware

declare module '@savchenko91/rc-redux-api-mw/dist/type.d' {
  export interface APIAction<ResponseBody = unknown, RequestBody = unknown, Payload = unknown>
    extends Omit<RequestInit, 'headers' | 'body'> {
    url: string
    type: typeof REDUX_API_MIDDLEWARE
    headers?: APIHeaders<ResponseBody, RequestBody, Payload>
    body?: RequestBody
    responseBodyType?: ResponseBodyType
    stageActionTypes: StageActionTypes
    onStart?: OnStart<ResponseBody, RequestBody, Payload>
    onSuccess?: OnSuccess<ResponseBody, RequestBody, Payload>
    onFail?: OnFail<ResponseBody, RequestBody, Payload>
    payload?: Payload
    query?: Record<string, unknown>
    cashe?: {
      name: string
      key: Record<string, unknown> | string | number | unknown[]
      expiresIn: number
    }
    clearCacheByKey?: string
  }
}
