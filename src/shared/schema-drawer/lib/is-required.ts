import { AssertionBindingItem, Catalog } from '@/shared/schema-drawer'

export default function isRequired(validators?: Catalog<AssertionBindingItem>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
