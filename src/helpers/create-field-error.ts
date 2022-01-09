import { ValidationError } from '@/utils/errors/errors'

export function createFieldError(fieldName: string, ...validators: ((value: unknown, key: string) => void)[]) {
  return (value: string): ValidationError | undefined => {
    try {
      validators.forEach((validate) => {
        validate(value, fieldName)
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        return error
      }
    }
  }
}
