import { IDropdownOption } from '@fluentui/react'
import { isEmpty } from '@savchenko91/schema-validator'

import { DrawerContext } from '../model/types'
import diff from 'object-diff'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onChange(context: DrawerContext, listener: (...args: any[]) => void, props?: any) {
  context.formProps.form.subscribe(
    (state) => {
      const difference1 = diff(context.formStatePrev.values, state.values)
      const difference2 = diff(context.formStatePrev.values, state.values)
      const difference = isEmpty(difference1) ? difference2 : difference1

      if (!isEmpty(difference)) {
        context.formStatePrev.values = state.values
        listener(context, { ...props, difference })
      }
    },
    {
      values: true,
    }
  )
  return
}

const eventList = {
  onChange: {
    name: 'onChange',
    function: onChange,
  },
}

export const eventNameOptions: IDropdownOption[] = Object.keys(eventList).map((eventName) => {
  return {
    key: eventName,
    text: eventName,
  }
})
