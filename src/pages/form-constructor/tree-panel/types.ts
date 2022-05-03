import { RenderItemParams, TreeItem } from '@atlaskit/tree'

import { SetterOrUpdater } from 'recoil'

import { Comp } from '@/common/types'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: TreeItemData
  }
}

export interface TreeItemAdditionalData {
  setPickedFCompId: SetterOrUpdater<string>
  pickedFCompId: string
}

export interface TreeItemData extends TreeItemAdditionalData {
  comp: Comp
}
