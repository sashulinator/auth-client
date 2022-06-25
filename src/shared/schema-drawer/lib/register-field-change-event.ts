import { FieldComponentContext } from '../model/types'
import { onFieldChange } from './events'
import { diff } from 'deep-object-diff'
import { getIn } from 'final-form'

export function registerFieldChangeEvent(context: FieldComponentContext) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return context.form.subscribe(
    (state) => {
      if (context?.formStatePrev?.values.id !== state?.values.id) {
        setTimeout(() => (context.formStatePrev = state))
        return
      }

      const fieldName = context.comp.name

      if (fieldName === undefined) {
        return
      }

      const fieldValuePrev = getIn(context?.formStatePrev?.values, fieldName)
      const fieldValueNext = getIn(state?.values, fieldName)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const difference = diff({ one: fieldValuePrev }, { one: fieldValueNext }) as any

      if ('one' in difference) {
        context.observer.emitEvent(onFieldChange.name)(difference.one)
      }

      setTimeout(() => (context.formStatePrev = state))
    },
    {
      values: true,
    }
  )
}
