export function normalize<T extends { id: string }[]>(obj: T): Record<string, T[number]> {
  return obj.reduce<Record<string, T[number]>>((acc, item) => {
    acc[item.id] = item as T[number]
    return acc
  }, {})
}
