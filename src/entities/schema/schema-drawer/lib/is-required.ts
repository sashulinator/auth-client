import { Norm, ValidatorItem } from '@/entities/schema'

export default function isRequired(validators?: Norm<ValidatorItem>) {
  if (!validators) {
    return undefined
  }
  return Object.values(validators).some((v) => v.name === 'string' || v.name === 'notUndefined')
}
