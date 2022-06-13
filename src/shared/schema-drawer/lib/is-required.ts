import { AssertionUnit, Catalog } from '@/shared/schema-drawer'

export default function isRequired(validators?: Catalog<AssertionUnit>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
