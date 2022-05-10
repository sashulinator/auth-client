import { RenderItemParams, TreeItem } from '@atlaskit/tree'

import { CompValidator } from '@/entities/schema'

export interface TreeLeafProps extends RenderItemParams {
  item: Omit<TreeItem, 'data'> & {
    data?: AdditionalData & {
      validator: CompValidator
    }
  }
}

export interface AdditionalData {
  remove: (id: string | number) => void
  changeValidator: (id: string | number, name: string, withValue?: unknown) => void
  pickItemId: React.Dispatch<React.SetStateAction<string>>
  pickedItemId: string
}
