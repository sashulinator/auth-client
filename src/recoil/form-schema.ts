import { atom, selector } from 'recoil'

import { normalizeToHashSchema } from '@/helpers/normalize'

export const formSchemaData = {
  id: 'ee4254ef-a9a3-4243-be68-51ce733b338e',
  name: 'credentials',
  title: 'Креды',
  description: 'some description',
  schema: [
    {
      formItemPropsSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
      id: 'ee4254ef-9099-4243-be68-51ce733b338e',
      name: 'PrimaryButton',
      type: 'button',
      props: {
        disabled: false,
      },
      children: ['first'],
    },
    {
      id: 'ee4254ef-7878-4243-be68-51ce733b338e',
      formItemPropsSchemaId: 'ee4254ef-9099-4289-be68-51ce733b3376',
      name: 'Stack',
      type: 'component',
      props: {
        disabled: true,
        as: 'ul',
        horizontal: true,
        verticalAlign: 'center',
        tokens: {
          childrenGap: 10,
          padding: '15px 40px',
        },
      },
      children: [
        {
          id: 'ee4254ef-9009-4243-be68-51ce733b338e',
          formItemPropsSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
          name: 'PrimaryButton',
          type: 'button',
          props: {
            disabled: false,
          },
          children: ['hello'],
        },
        {
          id: 'ee4254ef-5555-4243-be68-51ce733b338e',
          formItemPropsSchemaId: 'ee4254ef-9099-4243-be68-51ce733b3376',
          name: 'PrimaryButton',
          type: 'button',
          props: {
            disabled: false,
          },
          children: ['koko'],
        },
      ],
    },
  ],
}

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
