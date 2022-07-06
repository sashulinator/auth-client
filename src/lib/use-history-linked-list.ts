import { HistoryLinkedList } from './history-linked-list'
import { useForceUpdate } from './use-force-update'
import { useState } from 'react'

export function useHistoryLinkedList<T>(data: T): HistoryLinkedList<T> {
  const update = useForceUpdate()

  const [state] = useState(() => {
    const dll = new HistoryLinkedList<T>()

    dll.onInsertedLast = update

    dll.insertLast(data)

    return dll
  })

  return state
}
