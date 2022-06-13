import { AssertionBinding, Catalog } from '@/shared/schema-drawer'

export default function isRequired(validators?: Catalog<AssertionBinding>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
