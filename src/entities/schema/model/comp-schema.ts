import { atom } from 'recoil'

import { CompSchema, Dictionary } from '@/shared/schema-drawer'

export const schemasState = atom<null | Dictionary<CompSchema>>({
  key: 'schemasState',
  default: null,
})

export const selectedCompSchemaState = atom<null | CompSchema>({
  key: 'selectedCompSchema',
  default: null,
})
