import { APIAction, APIActionAlt, REDUX_API_MIDDLEWARE, StageActionTypes } from '@savchenko91/rc-redux-api-mw'

import { createAPIconstant } from './create-api-constants'

import { OnStage } from '@/types/transfer'

export type RawAPIAction<ResponseBody = unknown, RequestBody = unknown, Payload = unknown> = Omit<
  APIActionAlt<ResponseBody, RequestBody, Payload>,
  'type' | 'stageActionTypes'
>

type NonNullable<T> = Exclude<T, null | undefined>

type ExtractResponseBody<TActions extends { onSuccess?: APIAction['onSuccess'] }> = Parameters<
  NonNullable<TActions['onSuccess']>
>[0]['body']

export const createApiActions = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TRawAPIActions extends Record<string, (...args: any[]) => RawAPIAction<any, any, any>>
>(
  entityName: string,
  rawActions: TRawAPIActions
): {
  [k in keyof TRawAPIActions]: (
    ...args: [
      ...Parameters<TRawAPIActions[k]>,
      OnStage<ExtractResponseBody<ReturnType<TRawAPIActions[k]>>, ReturnType<TRawAPIActions[k]>['body']>
    ]
  ) => ReturnType<TRawAPIActions[k]> & { stageActionTypes: StageActionTypes; type: string }
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actions: any = {}

  const rawActionEntries = Object.entries(rawActions)

  for (let index = 0; index < rawActionEntries.length; index++) {
    const [actionName, action] = rawActionEntries[index] as [keyof TRawAPIActions, (...args: unknown[]) => RawAPIAction]

    const stageActionTypes = createAPIconstant(entityName, actionName)

    actions[actionName] = (...args: unknown[]): APIActionAlt => {
      const onStage = args[args.length - 1] || {}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        type: REDUX_API_MIDDLEWARE,
        stageActionTypes,
        ...action(...args),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...onStage,
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return actions
}
