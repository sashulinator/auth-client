import { IDropdownOption } from '@fluentui/react'

export default function optionsFromArrayOfArrays(arrayOfArrays: [string, string][]): IDropdownOption[] {
  return arrayOfArrays?.map((option: [string, string]) => {
    return {
      key: option?.[0],
      text: option?.[1],
    }
  })
}
