import { EventAssertionMeta } from '../schema-drawer/model/types'

interface AssertUndefinedProps {
  name: string
  isInit: boolean
}

export function assertUndefined(v: unknown, assertionProps: AssertUndefinedProps, meta: EventAssertionMeta) {
  const { context } = meta.payload
  const fieldState = context.formProps.form.getFieldState(assertionProps.name)
  const targetValue = fieldState?.[assertionProps.isInit ? 'initial' : 'value']

  if (targetValue !== undefined) {
    throw new Error('Target init value is not undefined!')
  }
}

//

interface AssertVisitedProps {
  name: string
}

export function assertVisited(v: unknown, assertionProps: AssertVisitedProps, meta: EventAssertionMeta) {
  const { context } = meta?.payload
  const visited = context.formProps.form.getFieldState(assertionProps.name)?.visited

  if (visited) {
    throw new Error('Field was not visited!')
  }
}
