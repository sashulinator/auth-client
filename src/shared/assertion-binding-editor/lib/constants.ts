import { ROOT_ID } from '@/constants/common'
import { AssertionBindingSchema, AssertionBindingType, EventToShowError } from '@/shared/schema-drawer'

export const initialSchema: AssertionBindingSchema = {
  eventToShowError: EventToShowError.onInit,
  catalog: {
    [ROOT_ID]: {
      id: ROOT_ID,
      name: 'root',
      type: AssertionBindingType.ROOT,
      children: [],
    },
  },
}
