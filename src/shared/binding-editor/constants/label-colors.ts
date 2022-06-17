import { AssertionBindingType, EventBindingType } from '@/shared/schema-drawer'

export const labelColors = {
  [AssertionBindingType.ASSERTION]: 'redBackground',
  [EventBindingType.ROOT]: 'hereCouldBeYourAd',
  [EventBindingType.ACTION]: 'blueBackground',
  [EventBindingType.EVENT]: 'greenBackground',
  [EventBindingType.OPERATOR]: 'yellowBackground',
  [EventBindingType.EVENT_ASSERTION]: 'redBackground',
}
