import { assertNotUndefined } from '@savchenko91/schema-validator'

import omitEmpty from 'omit-empty-es'

import { replace } from '@/lib/change-unmutable'
import { findEntity } from '@/lib/entity-actions'
import { BindingUnit, Norm } from '@/shared/schema-drawer'

export function useBindingActions<TUnit extends BindingUnit>(
  onChange: (value: Norm<TUnit> | undefined) => void,
  bindingItems?: Norm<TUnit> | undefined
) {
  function changeBinding(id: string | number, name: string, newBindingItemProps: unknown) {
    assertNotUndefined(bindingItems)

    const binding = findEntity(id, bindingItems)
    const newBindings = replace(bindingItems, id, {
      ...binding,
      name,
      ...(newBindingItemProps ? { props: newBindingItemProps } : undefined),
    })

    onChange(omitEmpty(newBindings))
  }

  return {
    changeBinding,
  }
}
