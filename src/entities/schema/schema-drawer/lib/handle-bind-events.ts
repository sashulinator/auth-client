import { ComponentContext } from '../../model/types'
import bindEvents from './bind-events'

export default function handleBindEvents(context: ComponentContext) {
  bindEvents(context)

  return () => {
    context.eventUnsubscribers.forEach((unsubscribe) => {
      unsubscribe()
    })
  }
}
