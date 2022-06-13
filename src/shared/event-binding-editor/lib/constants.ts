import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { Catalog, EventBindingSchemaItem, EventSchemaItemType, onFieldChange } from '@/shared/schema-drawer'

const id = uniqid()

export const defaultCompBindings: Catalog<EventBindingSchemaItem> = {
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
