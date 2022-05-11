import { isObject } from '@savchenko91/schema-validator'

export default function normilize<T>(input: unknown): T[] {
  if (isObject(input)) {
    return Object.values(input) as T[]
  }
  if (Array.isArray(input)) {
    return input
  }

  return input as T[]
}
