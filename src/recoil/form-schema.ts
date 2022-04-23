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
          padding: '45px 40px',
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
        {
          id: 'ee4234ef-9099-8943-8968-54ce733b870',
          formItemPropsSchemaId: 'ee4234ef-9099-8943-8968-51ce733b870',
          name: 'TextField',
          type: 'input',
          props: {
            disabled: false,
          },
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
