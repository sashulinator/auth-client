import { RenderItemParams, TreeItem } from '@atlaskit/tree'

import React from 'react'

import { Comp, CompSchema, Dictionary, LinkedComp } from '@/shared/schema-drawer'
import { AdditionalData } from '@/shared/tree'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: TreeItemData
  }
}

export interface TreeAdditionalData extends AdditionalData {
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, itemId: string, selectedIds: string[]) => void
  onMouseOver?: (itemId: string | number) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, itemId: string | number) => void
  schemas: Dictionary<CompSchema> | null
  editId?: string
  onDoubleClick: (compId?: string) => void
  updateComp: (comp: Comp | LinkedComp) => void
}

export interface TreeItemData extends TreeAdditionalData {
  entity: Comp | LinkedComp
  isExpandedBeforeSearchQuery: boolean
}
