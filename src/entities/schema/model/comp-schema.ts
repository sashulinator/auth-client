import { atom } from 'recoil'

import { Catalog, Schema } from '@/shared/schema-drawer'

export const schemasState = atom<null | Catalog<Schema>>({
  key: 'schemasState',
  default: null,
})

export const selectedCompSchemaState = atom<null | Schema>({
  key: 'selectedCompSchema',
  default: null,
})
