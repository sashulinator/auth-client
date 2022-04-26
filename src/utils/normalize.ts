export function normalize<T extends { id: string }[]>(arrOfObj: T): Record<string, T[number]> {
  return arrOfObj.reduce<Record<string, T[number]>>((acc, item) => {
    acc[item.id] = item as T[number]
    return acc
  }, {})
}

export function normalizeWithIndex<T extends { id: string }[]>(
  arrOfObj: T
): Record<string, T[number] & { indexInArray: number }> {
  return arrOfObj.reduce<Record<string, T[number] & { indexInArray: number }>>((acc, item, index) => {
    acc[item.id] = { ...item } as T[number] & { indexInArray: number }

    Object.defineProperty(acc[item.id], 'indexInArray', {
      value: index,
      writable: false,
      enumerable: false,
    })

    return acc
  }, {})
}
