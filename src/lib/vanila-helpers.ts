import { isObject } from '@savchenko91/schema-validator'

export function getValue(possibleEvent: unknown): undefined | unknown {
  if (isObject(possibleEvent)) {
    if ('target' in possibleEvent && isObject(possibleEvent.target) && 'value' in possibleEvent.target) {
      return possibleEvent.target.value
    }
  }

  return undefined
}

// TODO полезно будет
// export function getDataset(possibleEvent: unknown): undefined | unknown {}
