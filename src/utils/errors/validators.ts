import {
  assertMatchPattern,
  assertNotMoreThan,
  assertNotUndefined,
  assertNumber,
  assertString,
  assertStringifiedNumber,
} from '../assertions'
import { ValidationError } from './errors'

export function validateString(input: unknown, key: string): void {
  try {
    assertString(input)
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError({
        key,
        value: input,
        message: error.message,
        errorCode: validateString.name,
      })
    }
  }
}

export function validateNumber(input: unknown, key: string): void {
  try {
    assertNumber(input)
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError({
        key,
        value: input,
        message: error.message,
        errorCode: validateNumber.name,
      })
    }
  }
}

export function validateNotUndefined(input: unknown, key: string): void {
  try {
    assertNotUndefined(input)
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError({
        key,
        value: input,
        message: error.message,
        errorCode: validateNotUndefined.name,
      })
    }
  }
}

// TODO create closure
export function validateNotMoreThan(input: unknown, num: number, key: string, maxName?: string): void {
  try {
    assertNotMoreThan(input, num)
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError({
        key,
        value: input,
        message: error.message,
        errorCode: validateNotMoreThan.name,
        key2: maxName,
        value2: num,
      })
    }
  }
}

export function validateStringifiedNumber(input: unknown, key: string): void {
  try {
    assertStringifiedNumber(input)
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError({
        key,
        value: input,
        message: error.message,
        errorCode: validateStringifiedNumber.name,
      })
    }
  }
}

// TODO create closure
export function validateByPattern(input: unknown, pattern: unknown, key: string, patternName?: string): void {
  try {
    assertMatchPattern(input, pattern)
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError({
        key,
        value: input,
        message: error.message,
        errorCode: validateByPattern.name,
        value2: (pattern as string).toString(),
        key2: patternName,
      })
    }
  }
}
