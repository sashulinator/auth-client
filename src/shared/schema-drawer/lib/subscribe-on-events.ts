import { DrawerContext } from '../model/types'

import { ROOT_ID } from '@/constants/common'
import { Norm } from '@/entities/schema'

interface Bindings {
  name: string
  type: 'action' | 'assertion' | 'event' | 'operator'
}

export default function createEventsFactory(context: DrawerContext) {
  console.log('context', context)

  return function eventFactory(bindings: Norm<Bindings>) {
    if (!bindings) {
      return
    }

    const root = bindings[ROOT_ID] as Bindings

    if (!root) {
      return
    }
  }
}
