import { selectedSchemaItemState } from './form-schema'
import { atom, selector } from 'recoil'

export const propertiesState = atom({
  key: 'propertiesState',
  default: [
    {
      id: 'ee4254ef-9099-4243-be68-51ce733b338e',
      name: 'PrimaryButton',
      title: 'Button',
      description: 'button',
      children: [
        {
          path: 'children[0]',
          name: 'TextField',
          type: 'input',
          props: {
            placeholder: 'надпись',
          },
        },
        {
          path: 'props.disabled',
          name: 'Checkbox',
          type: 'input',
          props: {
            label: 'неактивный',
          },
        },
      ],
    },
  ],
})

export const selectedPropertyState = selector({
  key: 'selectedPropertyState',
  get: ({ get }) => {
    const properties = get(propertiesState)
    const selectedSchemaItem = get(selectedSchemaItemState)

    console.log('selectedSchemaItem', selectedSchemaItem)

    return properties.find((property) => property.name === selectedSchemaItem?.name)
  },
})
