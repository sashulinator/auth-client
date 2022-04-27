import { assertNotUndefined } from '@savchenko91/schema-validator'

import { FSchemaMock } from './form-schema.mock'
import { atom, selector } from 'recoil'

export const FSchemaState = atom({
  key: 'FSchemaState',
  default: FSchemaMock,
})

export const pickedFCompIdState = atom({
  key: 'pickedFCompIdState',
  default: '',
})

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const FSchema = get(FSchemaState)
    const pickedFCompId = get(pickedFCompIdState)

    if (pickedFCompId) {
      const pickedFComp = FSchema.schema[pickedFCompId]

      assertNotUndefined(pickedFComp)

      return pickedFComp
    }

    return null
  },
})
