export function replaceObjectInArray<T extends Record<string, unknown>[]>(
  key: string,
  array: T,
  object: Record<string, unknown>
): T {
  return array.map((item) => (item[key] === object[key] ? object : item)) as T
}
