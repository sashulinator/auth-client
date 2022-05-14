import { isObject } from '@savchenko91/schema-validator'

export default function objectToPath(objOrArr: Record<string, unknown> | unknown[]) {
  function factory(res: string, child: unknown): string {
    if (Array.isArray(child)) {
      return factory(`${res}[0]`, child[0])
    }
    if (isObject(child)) {
      const key = Object.keys(child)[0] as string
      return factory(`${res}.${key}`, child[key])
    }
    return res
  }

  return factory('', objOrArr).replace('.', '')
}
