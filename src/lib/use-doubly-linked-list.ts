import { DoublyLinkedList } from '@datastructures-js/linked-list'

import { useState } from 'react'

export function useDoublyLinkedList<T>(data: T): DoublyLinkedList<T> & { update: () => void } {
  const dll = new DoublyLinkedList<T>()

  dll.insertLast(data)

  const [state, setState] = useState(dll)

  const update = function (this: DoublyLinkedList<T>) {
    setState(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(state as any).update = update
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return state as any
}
