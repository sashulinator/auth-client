import { atom, selector } from 'recoil'

export const formSchemaState = atom({
  key: 'formSchemaState',
  default: {
    id: 'ee4254ef-a9a3-4243-be68-51ce733b338e',
    name: 'credentials',
    title: 'Креды',
    description: 'some description',
    children: [
      {
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
            name: 'PrimaryButton',
            type: 'button',
            props: {
              disabled: false,
            },
            children: ['hello'],
          },
          {
            id: 'ee4254ef-5555-4243-be68-51ce733b338e',
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
  },
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

    return formSchema?.children?.find((schemaItem) => schemaItem.id === selectedSchemaItemId)
  },
})
