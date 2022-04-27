import { assertNotUndefined } from '@savchenko91/schema-validator'

import { formSchemaMock } from './form-schema.mock'
import { atom, selector } from 'recoil'

export const formSchemaState = atom({
  key: 'formSchemaState',
  default: formSchemaMock,
})

export const pickedFCompIdState = atom({
  key: 'pickedFCompIdState',
  default: '',
})

export const pickedFCompState = selector({
  key: 'pickedFCompState',
  get: ({ get }) => {
    const formSchema = get(formSchemaState)
    const pickedFCompId = get(pickedFCompIdState)

    const pickedFComp = formSchema.schema[pickedFCompId]

    assertNotUndefined(pickedFComp)

    return pickedFComp
  },
})
