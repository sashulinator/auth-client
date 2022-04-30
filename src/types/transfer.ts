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
  _code: string
}

export interface ServerCollectableError extends ErrorWithCode {
  _message: string
  _key: string
  _input?: unknown
  _key2?: string
  _input2: unknown
}

export interface ServerError extends ErrorWithCode {
  _errors?: ServerCollectableError[]
  _message: string
  _timestamp: string
  _status: number
}
