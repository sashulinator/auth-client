import { AssertionItem, Catalog } from '@/shared/schema-drawer'

export default function isRequired(validators?: Catalog<AssertionItem>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
