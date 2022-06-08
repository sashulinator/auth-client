import { isObject } from 'lodash'

export default function buildObject<T>(src: T, path: string, value: unknown, delimiter = '.'): T {
  const arrPath = path.split(delimiter)
  const copySrc = { ...src }

  arrPath.reduce<Record<string, any>>((acc, prop, i) => {
    acc[prop] = i === arrPath.length - 1 ? value : isObject(acc[prop]) ? { ...acc[prop] } : acc[prop] || {}
    return acc[prop]
  }, copySrc)

  return copySrc
}
