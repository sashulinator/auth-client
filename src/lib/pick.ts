export function pick<T extends { [K in S]: T[K] }, S extends keyof T>(
  obj: T | undefined,
  propsArray: S[]
): { [K in S]: T[K] } | undefined {
  if (obj === undefined) {
    return undefined
  }

  const picked = {} as { [K in S]: T[K] }

  propsArray.forEach(function (prop) {
    picked[prop] = obj[prop]
  })

  return picked
}
