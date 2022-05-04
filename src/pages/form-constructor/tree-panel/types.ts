import { RenderItemParams, TreeItem } from '@atlaskit/tree'

import { SetterOrUpdater } from 'recoil'

import { Comp } from '@/common/types'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: TreeItemData
  }
}

export interface TreeItemAdditionalData {
  onItemClick: SetterOrUpdater<string[]>
  pickedIds: string[]
  onMouseOver?: (itemId: string | number) => void
  onMouseLeave?: (itemId: string | number) => void
  onFocus?: (itemId: string | number) => void
  onBlur?: (itemId: string | number) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, itemId: string | number) => void
}

export interface TreeItemData extends TreeItemAdditionalData {
  comp: Comp
}
