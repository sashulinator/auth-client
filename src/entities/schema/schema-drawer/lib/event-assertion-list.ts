import { IDropdownOption } from '@fluentui/react'
import { isObject } from '@savchenko91/schema-validator'

import { assertTargetInitValueUndefined } from './event-assertions'

import { Norm, Schema } from '@/entities/schema'

type AssertionListItem = AssertionItem | WithValueAssertionItem

export interface AssertionItem {
  type: 'assertion'
  function: any
}

export interface WithValueAssertionItem {
  type: 'withValue'
  // второй аргумент в ассёршене это объект который сабмитит схема
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function: (input: unknown, values: any) => void
  // значения схемы прилетят во второй аргумент ассёршена
  schema: Schema
}

export enum ComponentNames {
  TextField = 'TextField',
  Stack = 'Stack',
}

export const eventAssertionList: Norm<AssertionListItem> = {
  targetInitValueUndefined: {
    type: 'assertion',
    function: assertTargetInitValueUndefined,
  },
}

export function isWithValueAssertionItem(input: unknown): input is WithValueAssertionItem {
  if (isObject(input) && 'schema' in input) {
    return true
  }
  return false
}

export const eventAssertionNameOptions: IDropdownOption[] = Object.keys(eventAssertionList).map((assertionName) => {
  return {
    key: assertionName,
    text: assertionName,
  }
})
