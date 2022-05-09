import { isString } from '@savchenko91/schema-validator'

import { BindingContext } from '..'

import { getValue } from '@/lib/vanila-helpers'

/*
определенные события ждут определенных действий
*/

// events это context, actions и ...аргументы
export function isEqualEvent(
  context: BindingContext,
  actions: ((context: BindingContext, value: unknown, name: string, value2: unknown) => void)[],
  eventOrValue: unknown,
  name: string,
  value2: unknown
) {
  const eventValue = getValue(eventOrValue)
  const value = eventValue ?? eventOrValue

  if (isString(value) && isString(value2) && value === value2) {
    actions.forEach((action) => action(context, value, name, value2))
  }
}

// action это контекст и ...аргументы

// export function setValueAction(props: { victimName: string }) {
//   return (context: BindingContext, value: unknown) => {
//     context.form.change(props.victimName, value)
//   }
// }

// export function addCompAction(context: ActionContext, schemaId: string) {

// }
