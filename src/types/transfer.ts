import { OnSuccess, OnStart, OnFail } from '@savchenko91/rc-redux-api-mw'

export type OnStage<
  ResponseBody = unknown,
  RequestBody = unknown,
  Payload = unknown
> = {
  onStart?: OnStart<ResponseBody, RequestBody, Payload>
  onFail?: OnFail<ResponseBody, RequestBody, Payload>
  onSuccess?: OnSuccess<ResponseBody, RequestBody, Payload>
}

export type FindManyResponse<T> = {
  total: number
  items: T[]
}

export interface ValidationError {
  validatorName: string
  message: string
  key: string
  value: unknown
  key2?: string
  value2?: unknown
}
