import { compSchemaMock } from './comp-schema.mock'
import { pickedFCompState } from './form-schema'
import { atom, selector } from 'recoil'

import { buildCompHierarchy } from '@/helpers/build-comp-hierarchy'
import { normalize } from '@/utils/normalize'

export const compSchemasState = atom({
  key: 'compSchemasState',
  default: compSchemaMock,
})

export const normCompSchemasState = selector({
  key: 'normCompSchemasState',
  get: ({ get }) => {
    const compSchemas = get(compSchemasState)

    return normalize(compSchemas)
  },
})

export const normNormCompSchemasState = selector({
  key: 'normNormCompSchemasState',
  get: ({ get }) => {
    const compSchemas = get(compSchemasState)

    const normComps = compSchemas.map((compSchema) => ({ ...compSchema, schema: normalize(compSchema.schema) }))

    return normalize(normComps)
  },
})

export const selectedNormCompSchemaState = selector({
  key: 'selectedCompSchemaState',
  get: ({ get }) => {
    const normNormCompSchemas = get(normNormCompSchemasState)
    const selectedComp = get(pickedFCompState)

    if (selectedComp) {
      return normNormCompSchemas[selectedComp.componentSchemaId]
    }

    return null
  },
})

export const selectedHierarchyCompSchemaState = selector({
  key: 'selectedHierarchyCompSchemaState',
  get: ({ get }) => {
    const normCompSchemas = get(normCompSchemasState)
    const normNormCompSchemas = get(normNormCompSchemasState)
    const selectedComp = get(pickedFCompState)
    const normCompSchema = normCompSchemas[selectedComp?.componentSchemaId || '']
    const normNormCompSchema = normNormCompSchemas[selectedComp?.componentSchemaId || '']

    if (selectedComp && normCompSchema && normNormCompSchema) {
      return {
        ...normCompSchema,
        schema: buildCompHierarchy(normCompSchema.schema, normNormCompSchema.schema),
      }
    }

    return null
  },
})
