export function mapObject<Obj extends Record<string, unknown>, T>(
  obj: Obj,
  fn: (value: Obj[keyof Obj], key: keyof Obj) => T
): Record<keyof Obj, T> {
  const res = Object.entries(obj)?.reduce<Record<string, T>>((acc, [key, value]) => {
    acc[key] = fn(value as Obj[keyof Obj], key)
    return acc
  }, {})

  return res as Record<keyof Obj, T>
}
