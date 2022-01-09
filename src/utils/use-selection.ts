import { Selection, SelectionMode } from '@fluentui/react'

import { useState } from 'react'

export function useSelection<T extends Record<'id', string | number>>(initialState: T[] = []) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialState)

  const selection = new Selection<Record<'id', string | number>>({
    selectionMode: SelectionMode.multiple,
    getKey: (item) => item.id.toString(),
    onSelectionChanged: () => {
      setSelectedItems(selection.getSelection() as T[])
    },
  })

  return { selectedItems, selection } as const
}
