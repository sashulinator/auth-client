import { atom } from 'recoil'

import { Norm, Schema } from '@/entities/schema'

export const schemasState = atom<null | Norm<Schema>>({
  key: 'schemasState',
  default: null,
})

export const selectedCompSchemaState = atom<null | Schema>({
  key: 'selectedCompSchema',
  default: null,
})
