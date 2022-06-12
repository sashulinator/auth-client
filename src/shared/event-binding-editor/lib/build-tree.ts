import { TreeItem } from '@atlaskit/tree'

import { ROOT_ID } from '@/constants/common'
import { mutateObject } from '@/lib/mutate-object'
import { EventUnit, Norm } from '@/shared/schema-drawer'

export interface AdditionalData {
  remove: (id: string | number) => void
  changeBinding: (id: string | number, name: string, withValue?: unknown) => void
  selectItemId: React.Dispatch<React.SetStateAction<string>>
  selectedItemId: string
  errorId?: string
}

export default function buildTree(bindings: Norm<EventUnit> | undefined, additionalData: AdditionalData) {
  if (bindings === undefined) {
    return undefined
  }

  const items = mutateObject<TreeItem, Norm<EventUnit>>(bindings)((binding) => {
    return {
      ...binding,
      id: binding.id,
      isExpanded: true,
      hasChildren: binding.children !== undefined,
      children: binding.children || [],
      data: { binding, ...additionalData },
    }
  })

  return {
    rootId: ROOT_ID,
    items,
  }
}
