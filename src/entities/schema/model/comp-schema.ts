import { atom } from 'recoil'

import { Catalog, CompSchema } from '@/shared/schema-drawer'

export const schemasState = atom<null | Catalog<CompSchema>>({
  key: 'schemasState',
  default: null,
})

export const selectedCompSchemaState = atom<null | CompSchema>({
  key: 'selectedCompSchema',
  default: null,
})
