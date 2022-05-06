export function insert<T extends unknown[] | Record<string, unknown>>(
  arrOrObj: T,
  indexOrKey: string | number,
  newItem: unknown
): T {
  if (Array.isArray(arrOrObj)) {
    if (indexOrKey === arrOrObj.length) {
      return [...arrOrObj, newItem] as T
    }

    if (indexOrKey === 0) {
      return [newItem, ...arrOrObj] as T
    }

    return arrOrObj.reduce<unknown[]>((acc, item, i) => {
      if (i === indexOrKey) {
        acc.push(newItem)
      }
      acc.push(item)
      return acc
    }, []) as T
  }

  return { ...arrOrObj, [indexOrKey]: newItem }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function remove<T extends unknown[] | Record<string, any>>(arrOrObj: T, indexOrKey: string | number): T {
  if (Array.isArray(arrOrObj)) {
    return arrOrObj.filter((elem, i) => i !== indexOrKey) as T
  }

  const newObj = { ...arrOrObj }
  delete newObj[indexOrKey as keyof T]

  return newObj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replace<T extends unknown[] | Record<string, any>>(
  arrOrObj: T,
  indexOrKey: string | number,
  newItem: unknown
): T {
  if (Array.isArray(arrOrObj)) {
    return arrOrObj.map((item, i) => {
      if (i === indexOrKey) {
        return newItem
      }
      return item
    }) as T
  }
  return { ...arrOrObj, [indexOrKey]: newItem }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replaceById<T extends unknown[] | Record<string, any>>(newItem: Record<'id', string>, arrOrObj: T): T {
  return { ...arrOrObj, [newItem.id]: newItem }
}
