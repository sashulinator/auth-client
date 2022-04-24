import { atom, selector } from 'recoil'

import { normalizeToHashSchema } from '@/helpers/normalize'

export const formSchemaData = {
  id: 'ee4254ef-a9a3-4243-be68-51ce733b338e',
  name: 'credentials',
  title: 'Креды',
  description: 'some description',
  schema: [
    {
      id: 'ee4254ef-7878-4243-be68-51ce733b338e',
      componentSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
      name: 'Stack',
      path: 'hello',
      type: 'component',
      props: {
        as: 'ul',
        horizontal: true,
        verticalAlign: 'center',
        tokens: {
          childrenGap: 10,
          padding: '45px 40px',
        },
      },
      children: [
        {
          path: 'hello12',
          id: 'ee4254ef-9009-4243-be68-51ce733b338e',
          componentSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
          name: 'PrimaryButton',
          type: 'button',
          props: {
            disabled: false,
            type: 'submit',
          },
          children: ['hello'],
        },
        {
          id: 'ee4254ef-5555-4243-be68-51ce733b338e',
          componentSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
          path: 'world',
          name: 'PrimaryButton',
          type: 'button',
          props: {
            disabled: false,
          },
          children: ['koko'],
        },
        {
          id: 'ee4234ef-9099-8943-8968-54ce7subject',
          componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
          path: 'funny',
          name: 'TextField',
          defaultValue: 'init',
          type: 'input',
          bindings: {
            event: 'onChange',
            actions: ['setValue'],
            componentIds: ['ee4234ef-9099-8943-8968-54ce73object'],
          },
        },
        {
          id: 'ee4234ef-9099-8943-8968-54ce73object',
          componentSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
          path: 'kuku',
          name: 'TextField',
          type: 'input',
        },
      ],
    },
  ],
}

// TODO: rename to normFormSchemaState
export const formSchemaState = atom({
  key: 'formSchemaState',
  default: normalizeToHashSchema(formSchemaData.schema),
})

export const selectedSchemaItemIdState = atom({
  key: 'selectedSchemaItemIdState',
  default: '',
})

export const selectedSchemaItemState = selector({
  key: 'selectedSchemaItemState',
  get: ({ get }) => {
    const formSchema = get(formSchemaState)
    const selectedSchemaItemId = get(selectedSchemaItemIdState)

    return formSchema?.[selectedSchemaItemId]
  },
})
