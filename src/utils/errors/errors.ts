export class BaseError extends Error {
  public readonly errors?: Record<string, CollectableError>
  public readonly errorCode: string

  constructor(message: string, errorCode: string) {
    super(message)
    this.errorCode = errorCode
  }
}

export class ServerError extends BaseError {
  public readonly status: number
  public readonly timestamp: string

  constructor(message: string, errorCode: string, status: number) {
    super(message, errorCode)
    this.status = status
    this.timestamp = new Date().toDateString()
  }
}

export abstract class CollectableError extends Error {
  // can be a field name in a validated object
  key: string

  constructor(message: string, key: string) {
    super(message)
    this.key = key
  }
}

interface ErrorWithCode {
  // very handy when you need to translate or to give a more detailed information
  // depending on a context on a client side
  // example: you try to create a user and receive { errorCode: CONFLICT }
  // so you can show the message "Such user already exists"
  errorCode: string
}

export class ValidationError extends CollectableError implements ErrorWithCode {
  // can be a field value in a validated object
  value: unknown
  // can be a pattern name (email, uuid), a measuring system (kg, m) or a limit name (card/phone number limit)
  key2?: string
  // value that we somehow compared with ValidationError['value']
  value2?: unknown
  errorCode: string
  // why there is no 'children' property like in ValidationError from nestjs?
  // Because it makes a redundant nesting, we can show the nesting by a key { 'user.credentials[0]': ... }

  constructor(props: Omit<ValidationError, 'name'>) {
    super(props.message, props.key)
    this.key = props.key
    this.value = props.value
    this.key2 = props.key2
    this.value2 = props.value2
    this.errorCode = props.errorCode
  }
}
