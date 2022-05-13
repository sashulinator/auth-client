import { isEmpty } from '@savchenko91/schema-validator'

import { DrawerContext } from '../model/types'
import diff from 'object-diff'

import { ROOT_ID } from '@/constants/common'
import { Norm } from '@/entities/schema'

interface Bindings {
  name: string
  type: 'action' | 'assertion' | 'event' | 'operator'
}

export default function createEventsFactory(context: DrawerContext) {
  return function eventFactory(bindings: Norm<Bindings>) {
    if (!bindings) {
      return
    }

    const root = bindings[ROOT_ID] as Bindings

    if (!root) {
      return
    }

    createEvent(context, root.name, () => {
      console.log('allo')
    })
  }
}

function createEvent(context: DrawerContext, eventName: string, listener: (...args: any[]) => void, props?: any) {
  if (eventName === 'onChange') {
    context.formProps.form.subscribe(
      (state) => {
        const difference = diff(context.formStatePrev.values, state.values)

        if (!isEmpty(difference)) {
          console.log('diff', difference)
          context.formStatePrev.values = state.values
        }
        // console.log('difference', difference)
      },
      {
        values: true,
      }
    )
    return
  }
  if (eventName === 'onClick') {
    const element = document.querySelector(props.compId)

    if (element) {
      element.addEvenlistener('click')
      listener(context, eventName, props)
    }

    return
  }
}
