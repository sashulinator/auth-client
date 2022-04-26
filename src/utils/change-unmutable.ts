export function insert<T extends unknown[] | Record<string, unknown>>(
  arrOrObj: T,
  indexOrKey: string | number,
  newItem: unknown
): T {
  if (Array.isArray(arrOrObj)) {
    return [...arrOrObj.slice(0, indexOrKey as number), newItem, ...arrOrObj.slice(indexOrKey as number)] as T
  }

  return { ...arrOrObj, [indexOrKey]: newItem }
}

export function remove<T extends unknown[] | Record<string, unknown>>(arrOrObj: T, indexOrKey: string | number): T {
  if (Array.isArray(arrOrObj)) {
    return [...arrOrObj.slice(0, (indexOrKey as number) - 1), ...arrOrObj.slice(indexOrKey as number)] as T
  }

  const newObj = { ...arrOrObj }
  delete newObj[indexOrKey as keyof T]

  return newObj
}

export function replace<T extends unknown[] | Record<string, unknown>>(
  arrOrObj: T,
  indexOrKey: string | number,
  newItem: unknown
): T {
  if (Array.isArray(arrOrObj)) {
    return [...arrOrObj.slice(0, (indexOrKey as number) - 1), newItem, ...arrOrObj.slice(indexOrKey as number)] as T
  }

  return { ...arrOrObj, [indexOrKey]: newItem }
}
