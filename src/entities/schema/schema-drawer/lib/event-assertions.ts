import { Meta } from '@savchenko91/schema-validator'

import { ActionProps } from '../model/types'

type EventAssertionMeta = Meta & { payload: ActionProps }

export function _undefined(value: unknown, assertionProps: any, meta: EventAssertionMeta) {
  const { context } = meta?.payload
  const eventFieldName = assertionProps?.name as string
  const isInit = assertionProps?.isInit as boolean
  const targetValue = context?.formProps?.form?.getFieldState(eventFieldName)?.[isInit ? 'initial' : 'value']

  if (targetValue !== undefined) {
    throw new Error('Target init value is not undefined!')
  }
}

export function visiting(value: unknown, assertionProps: any, meta: EventAssertionMeta) {
  const { context } = meta?.payload
  const eventFieldName = assertionProps?.name as string
  const isNotVisiting = assertionProps?.isNotVisited as string
  const visited = context?.formProps?.form?.getFieldState(eventFieldName)?.visited

  if (isNotVisiting && visited) {
    throw new Error('Field was not visited!')
  }

  if (!isNotVisiting && !visited) {
    throw new Error('Field visited!')
  }
}
