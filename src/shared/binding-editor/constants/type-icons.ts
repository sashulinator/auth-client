import { AssertionBindingType, EventBindingType } from '@/shared/schema-drawer'

export const typeIcons = {
  [AssertionBindingType.ASSERTION]: 'Robot',
  [EventBindingType.ACTION]: 'LightningBolt',
  [EventBindingType.EVENT]: 'TouchPointer',
  [EventBindingType.OPERATOR]: 'DrillExpand',
  [EventBindingType.EVENT_ASSERTION]: 'Robot',
  [EventBindingType.ROOT]: 'R',
}
