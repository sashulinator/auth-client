import { DrawerContext } from '../model/types'
import { diff } from 'deep-object-diff'
import { getIn } from 'final-form'

export default function createOnFieldChangeEvent(context: DrawerContext) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (fieldName: string, onFieldChange: (value: any) => void) => {
    return context.formProps.form.subscribe(
      (state) => {
        if (context?.formStatePrev?.values.id !== state?.values.id) {
          context.formStatePrev = state
          return
        }

        const fieldValuePrev = getIn(context?.formStatePrev?.values, fieldName)
        const fieldValueNext = getIn(state?.values, fieldName)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const difference = diff({ one: fieldValuePrev }, { one: fieldValueNext }) as any

        if ('one' in difference) {
          onFieldChange(difference.one)
        }

        context.formStatePrev = state
      },
      {
        values: true,
      }
    )
  }
}
