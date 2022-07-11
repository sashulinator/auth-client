import { Selection, SelectionMode } from '@fluentui/react'

import { useState } from 'react'

import { AnyRecord } from '@/types/common'

export function useSelection<T extends AnyRecord>(initialState: T[], idKey = 'id') {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialState)

  const selection = new Selection<AnyRecord>({
    selectionMode: SelectionMode.multiple,
    getKey: (item) => item?.[idKey]?.toString(),
    onSelectionChanged: () => {
      setSelectedItems(selection.getSelection() as T[])
    },
  })

  return { selectedItems, selection } as const
}
