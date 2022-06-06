import { IDropdownOption } from '@fluentui/react'

export function generateOptionsFromObject(object: Record<string, unknown>) {
  return generateOptionsFromStringArray(Object.keys(object))
}

export function generateOptionsFromArrayOfArrays(arrayOfArrays: [string, string][]): IDropdownOption[] {
  return arrayOfArrays?.map((option: [string, string]) => {
    return {
      key: option?.[0],
      text: option?.[1],
    }
  })
}

export function generateOptionsFromStringArray(arr: string[], t?: (s: string) => string) {
  return arr.map((string) => ({
    text: t ? t(string.toString()) : string,
    key: string,
  }))
}
