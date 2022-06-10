import { EventUnitType } from '@/shared/schema-drawer'

export const labelColors = {
  [EventUnitType.ACTION]: 'blueBackground',
  [EventUnitType.EVENT]: 'greenBackground',
  [EventUnitType.OPERATOR]: 'violetBackground',
  [EventUnitType.ASSERTION]: 'redBackground',
  [EventUnitType.ROOT]: 'root',
}
