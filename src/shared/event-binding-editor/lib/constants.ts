import { ROOT_ID } from '@/constants/common'
import { Dictionary, EventBinding, EventBindingType } from '@/shared/schema-drawer'

export const defaultCompBindings: Dictionary<EventBinding> = {
  [ROOT_ID]: {
    id: ROOT_ID,
    name: 'root',
    type: EventBindingType.ROOT,
    children: [],
  },
}
