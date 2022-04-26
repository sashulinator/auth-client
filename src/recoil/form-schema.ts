import { formSchemaMock } from './form-schema.mock'
import { atom, selector } from 'recoil'

import { buildCompHierarchy } from '@/helpers/build-comp-hierarchy'
import { normalizeWithIndex } from '@/utils/normalize'

export const formSchemaState = atom({
  key: 'formSchemaState',
  default: formSchemaMock,
})

export const normFormSchemaState = selector({
  key: 'normFormSchemaState',
  get: ({ get }) => {
    const formSchema = get(formSchemaState)

    return {
      ...formSchema,
      schema: normalizeWithIndex(formSchema.schema),
    }
  },
})

export const hierarchyFormSchemaState = selector({
  key: 'hierarchyFormSchemaState',
  get: ({ get }) => {
    const formSchema = get(formSchemaState)
    const normFormSchema = get(normFormSchemaState)

    return {
      ...formSchema,
      schema: buildCompHierarchy(formSchema.schema, normFormSchema.schema),
    }
  },
})

export const selectedCompIdState = atom({
  key: 'selectedCompIdState',
  default: '',
})

export const selectedCompState = selector({
  key: 'selectedCompState',
  get: ({ get }) => {
    const normFormSchema = get(normFormSchemaState)
    const selectedCompId = get(selectedCompIdState)

    return normFormSchema.schema[selectedCompId]
  },
})
