import { RenderItemParams, TreeItem } from '@atlaskit/tree'

import React from 'react'

import { Catalog, Comp, CompSchema } from '@/shared/schema-drawer'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: TreeItemData
  }
}

export interface TreeAdditionalData {
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, itemId: string) => void
  pickedIds: string[]
  onMouseOver?: (itemId: string | number) => void
  onMouseLeave?: (itemId: string | number) => void
  onFocus?: (itemId: string | number) => void
  onBlur?: (itemId: string | number) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, itemId: string | number) => void
  schemas: Catalog<CompSchema> | null
  searchQuery?: string
  editId?: string
  onDoubleClick: (compId?: string) => void
  updateComp: (comp: Comp) => void
}

export interface TreeItemData extends TreeAdditionalData {
  comp: Comp
}
