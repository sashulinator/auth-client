import { MyDoublyLinkedList } from './doubly-linked-list'
import { useForceUpdate } from './use-force-update'
import { useState } from 'react'

export function useDoublyLinkedList<T>(data: T): MyDoublyLinkedList<T> {
  const update = useForceUpdate()

  const [state] = useState(() => {
    const dll = new MyDoublyLinkedList<T>()

    dll.insertLast(data)

    dll.update = update

    return dll
  })

  return state
}
