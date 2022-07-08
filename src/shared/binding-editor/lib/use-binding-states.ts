import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import omitEmpty from 'omit-empty-es'
import { useState } from 'react'
import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { replace } from '@/lib/change-unmutable'
import { addEntity, findEntity } from '@/lib/entity-actions'
import { Binding, BindingSchema, Dictionary } from '@/shared/schema-drawer'

export const defaultCompBindings: Dictionary<Binding> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: 'ROOT',
    children: [],
  },
}

export function useBindingStates<TUnit extends Binding, TSchema extends BindingSchema<TUnit>>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: BindingSchema<any> | undefined) => void,
  // can receive string because of final-form
  value: TSchema | string | undefined,
  initialSchema?: TSchema
) {
  const [selectedItemId, selectItemId] = useState('')

  const schema = isString(value) ? undefined : value
  const data = schema?.data
  const selectedBinding = data?.[selectedItemId]

  function changeBinding(id: string | number, name: string, newBindingItemProps: unknown) {
    assertNotUndefined(data)

    const binding = findEntity(id, data)
    const newBindings = replace(data, id, {
      ...binding,
      name,
      ...(newBindingItemProps ? { props: newBindingItemProps } : undefined),
    })

    const newCatalog: TSchema['data'] = omitEmpty(newBindings)

    onChange({ ...schema, data: newCatalog } as TSchema)
  }

  function addBinding(rawBinding: Omit<TUnit, 'id' | 'children'> & { children?: string[] }): void {
    const id = uniqid()
    const binding = { children: [], ...rawBinding, id }

    let newCatalog = data ?? defaultCompBindings

    newCatalog = addEntity(binding, ROOT_ID, 0, newCatalog)

    onChange({ ...initialSchema, data: newCatalog })
  }

  return {
    changeBinding,
    schema,
    data,
    selectedBinding,
    selectItemId,
    selectedItemId,
    addBinding,
  }
}
