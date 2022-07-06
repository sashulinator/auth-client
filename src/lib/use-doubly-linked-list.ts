import { MyDoublyLinkedList } from './doubly-linked-list'
import { useState } from 'react'

export function useDoublyLinkedList<T>(data: T): MyDoublyLinkedList<T> & { update: () => void } {
  const dll = new MyDoublyLinkedList<T>()

  dll.insertLast(data)

  const [state] = useState(dll)
  const [, setUpdate] = useState({})

  const update = function () {
    setUpdate({})
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(state as any).update = update
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return state as any
}
