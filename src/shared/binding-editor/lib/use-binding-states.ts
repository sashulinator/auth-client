import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import omitEmpty from 'omit-empty-es'
import { useState } from 'react'

import { replace } from '@/lib/change-unmutable'
import { findEntity } from '@/lib/entity-actions'
import { Binding, BindingSchema, Catalog, EventBindingSchema } from '@/shared/schema-drawer'

export function useBindingStates<TUnit extends Binding>(
  onChange: (value: BindingSchema<TUnit> | undefined) => void,
  // can receive string because of final-form
  value?: EventBindingSchema | string
) {
  const [selectedItemId, selectItemId] = useState('')

  const schema = isString(value) ? undefined : value
  const catalog = schema?.catalog
  const selectedBinding = catalog?.[selectedItemId]

  function changeBinding(id: string | number, name: string, newBindingItemProps: unknown) {
    assertNotUndefined(catalog)

    const binding = findEntity(id, catalog)
    const newBindings = replace(catalog, id, {
      ...binding,
      name,
      ...(newBindingItemProps ? { props: newBindingItemProps } : undefined),
    })

    const newCatalog: Catalog<TUnit> = omitEmpty(newBindings)

    onChange({ catalog: newCatalog })
  }

  return {
    changeBinding,
    schema,
    catalog,
    selectedBinding,
    selectItemId,
    selectedItemId,
  }
}
