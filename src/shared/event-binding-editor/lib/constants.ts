import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Catalog, EventSchemaItem, EventSchemaItemType, onFieldChange } from '@/shared/schema-drawer'

const id = uniqid()

export const defaultCompBindings: Catalog<EventSchemaItem> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: EventSchemaItemType.ROOT,
    children: [id],
  },
  [id]: {
    id,
    name: onFieldChange.name,
    type: EventSchemaItemType.EVENT,
    children: [],
  },
}
