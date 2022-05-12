import { Context } from '../model/types'

export default function eventsFactory(context: Context) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (eventName: string, orAnd: (...args: any[]) => void, props: any) => {
    if (eventName === 'onChange') {
      // context.fns.formSubscribe(
      //   (...args) => {
      //     console.log('values', ...args)
      //   },
      //   {
      //     values: true,
      //   }
      // )
      return
    }
    if (eventName === 'onClick') {
      const element = document.querySelector(props.compId)

      if (element) {
        element.addEvenlistener('click')
        orAnd(context, eventName, props)
      }

      return
    }
  }
}
