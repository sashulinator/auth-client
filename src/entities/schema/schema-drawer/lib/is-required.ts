import { AssertionUnit, Norm } from '@/entities/schema'

export default function isRequired(validators?: Norm<AssertionUnit>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
