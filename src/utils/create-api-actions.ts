import { APIActionAlt, REDUX_API_MIDDLEWARE, StageActionTypes } from '@savchenko91/rc-redux-api-mw'

import { createAPIconstant } from './create-api-constants'

export type RawAPIAction<ResponseBody = unknown, RequestBody = unknown, Payload = unknown> = Omit<
  APIActionAlt<ResponseBody, RequestBody, Payload>,
  'type' | 'stageActionTypes'
>

export const createApiActions = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TRawAPIActions extends Record<string, (...args: any[]) => RawAPIAction<any, any, any>>
>(
  entityName: string,
  rawActions: TRawAPIActions
): {
  [k in keyof TRawAPIActions]: (
    ...args: Parameters<TRawAPIActions[k]>
  ) => ReturnType<TRawAPIActions[k]> & { stageActionTypes: StageActionTypes; type: string }
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actions: any = {}

  const rawActionEntries = Object.entries(rawActions)

  for (let index = 0; index < rawActionEntries.length; index++) {
    const [actionName, action] = rawActionEntries[index] as [keyof TRawAPIActions, (...args: unknown[]) => RawAPIAction]

    const stageActionTypes = createAPIconstant(entityName, actionName)

    actions[actionName] = (...args: unknown[]): APIActionAlt => {
      return {
        type: REDUX_API_MIDDLEWARE,
        stageActionTypes,
        ...action(...args),
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return actions
}
