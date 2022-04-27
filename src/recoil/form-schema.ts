import { formSchemaMock } from './form-schema.mock'
import { atom, selector } from 'recoil'

import { buildCompHierarchy } from '@/helpers/build-comp-hierarchy'
import { normalizeWithIndex } from '@/utils/normalize'

export const formSchemaState = atom({
  key: 'formSchemaState',
  default: formSchemaMock,
})

export const normFCompsState = selector({
  key: 'normFCompsState',
  get: ({ get }) => {
    const formSchema = get(formSchemaState)
    return normalizeWithIndex(formSchema.schema)
  },
})

export const hierarchicalFCompsState = selector({
  key: 'hierarchicalFCompsState',
  get: ({ get }) => {
    const formSchema = get(formSchemaState)
    const normFComps = get(normFCompsState)

    return buildCompHierarchy(formSchema.schema, normFComps)
  },
})

export const pickedFCompIdState = atom({
  key: 'pickedFCompIdState',
  default: '',
})

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const normFComps = get(normFCompsState)
    const pickedFCompId = get(pickedFCompIdState)

    return normFComps[pickedFCompId]
  },
})
