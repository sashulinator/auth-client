import { compSchemaMock } from './comp-schema.mock'
import { pickedNormFCompState } from './form-schema'
import { atom, selector } from 'recoil'

import { buildCompHierarchy } from '@/helpers/build-comp-hierarchy'
import { normalizeWithIndex } from '@/utils/normalize'

export const compSchemasState = atom({
  key: 'compSchemasState',
  default: compSchemaMock,
})

export const normCSchemasState = selector({
  key: 'normCSchemasState',
  get: ({ get }) => {
    const compSchemas = get(compSchemasState)

    const normCSchemas = compSchemas.map((compSchema) => ({
      ...compSchema,
      schema: normalizeWithIndex(compSchema.schema),
    }))

    return normalizeWithIndex(normCSchemas)
  },
})

export const pickedNormCSchemaState = selector({
  key: 'pickedNormCSchemaState',
  get: ({ get }) => {
    const normCSchemas = get(normCSchemasState)
    const pickedFComp = get(pickedNormFCompState)

    if (pickedFComp) {
      const pickedNormCSchema = normCSchemas[pickedFComp.componentSchemaId]

      if (!pickedNormCSchema) {
        throw new Error('System error')
      }

      return pickedNormCSchema
    }

    return null
  },
})

export const pickedCSchemaState = selector({
  key: 'pickedCSchemaState',
  get: ({ get }) => {
    const pickedNormCSchema = get(pickedNormCSchemaState)
    const compSchemas = get(compSchemasState)

    if (pickedNormCSchema) {
      const compSchema = compSchemas[pickedNormCSchema.indexInArray]

      if (compSchema === undefined) {
        throw new Error('System error')
      }

      return compSchema
    }

    return null
  },
})

export const pickedHierarchicalCCompsState = selector({
  key: 'pickedHierarchicalCCompsState',
  get: ({ get }) => {
    const pickedCSchema = get(pickedCSchemaState)
    const pickedNormCSchema = get(pickedNormCSchemaState)

    if (pickedCSchema && pickedNormCSchema) {
      return buildCompHierarchy(pickedCSchema?.schema, pickedNormCSchema?.schema)
    }

    return null
  },
})
