import { isObject } from '@savchenko91/schema-validator'

import { Comp, CompSchema, LinkedComp } from '../model/types'

export function hasId(input: unknown): input is { id: string } {
  return isObject(input) && 'id' in input
}

export function hasInstanceId(input: unknown): input is { instance_id: string } {
  return isObject(input) && 'instanceId' in input
}

export function assertHasId(input: unknown): asserts input is { id: string } {
  if (!hasId(input)) {
    throw new Error('has not id!')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasSchema<T>(input: T | undefined): input is T & { schema: CompSchema } {
  if (isObject(input) && 'schema' in input) {
    return true
  }
  return false
}

export function isInputType<T extends { type: string } | undefined>(input: T): boolean {
  return input?.type === 'input' || input?.type === 'checkbox'
}

export function isCheckbox<T extends { type: string }>(input: T): boolean {
  return input.type === 'checkbox'
}

export function isLinkedComp(input: unknown): input is LinkedComp {
  return isObject(input) && 'linkedSchemaId' in input
}

export function isComp(input: unknown): input is Comp {
  return isObject(input) && 'compSchemaId' in input
}

export function assertLinkedComp(input: unknown): asserts input is LinkedComp {
  if (!isLinkedComp(input)) {
    throw new Error('is not LinkedComp')
  }
}

export function assertNotLinkedComp<T>(input: T | LinkedComp): asserts input is T {
  if (isLinkedComp(input)) {
    throw new Error('is LinkedComp')
  }
}
