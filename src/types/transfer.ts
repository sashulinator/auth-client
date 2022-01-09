import { OnSuccess, OnStart, OnFail } from '@savchenko91/rc-redux-api-mw'

export type OnStage<ResponseBody = unknown, RequestBody = unknown, Payload = unknown> = {
  onStart?: OnStart<ResponseBody, RequestBody, Payload>
  onFail?: OnFail<ResponseBody, RequestBody, Payload>
  onSuccess?: OnSuccess<ResponseBody, RequestBody, Payload>
}

export type FindManyResponse<T> = {
  total: number
  items: T[]
}

export type CreateInput<Entity extends Record<string, unknown>> = Omit<
  Entity,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>

export type UpdateInput<Entity extends Record<string, unknown>> = Omit<
  Entity,
  'createdAt' | 'deletedAt' | 'updatedAt'
> & { id: string }

export interface ErrorWithCode {
  // very handy when you need to translate or to give a more detailed information
  // depending on a context on a client side
  // example: you try to create a user and receive { errorCode: CONFLICT }
  // so you can show the message "Such user already exists"
  errorCode: string
}

export interface ServerCollectableError extends ErrorWithCode {
  message: string
  key: string
  value: unknown
  key2?: string
  value2?: unknown
}

export interface ServerError extends ErrorWithCode {
  errors?: ServerCollectableError[]
  message: string
  timestamp: string
  status: number
}
