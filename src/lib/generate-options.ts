import optionsFromStringArray from './options-from-string-array'

export function generateOptionsFromObject(object: Record<string, unknown>) {
  return optionsFromStringArray(Object.keys(object))
}
