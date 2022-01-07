export function isNumber(num: unknown): num is number {
  if (typeof num === 'number' || num instanceof Number) {
    return true
  }

  return false
}
