import { AssertionBinding, Dictionary } from '@/shared/schema-drawer'

export default function isRequired(validators?: Dictionary<AssertionBinding>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
