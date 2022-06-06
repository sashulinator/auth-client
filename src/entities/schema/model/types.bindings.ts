export interface BindingUnit {
  id: string
  name: string
  children: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any
}

export interface AssertionUnit extends BindingUnit {
  type: AssertionUnitType
}

export interface EventUnit extends BindingUnit {
  type: EventUnitType
}

export enum AssertionUnitType {
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
}

export enum EventUnitType {
  EVENT = 'EVENT',
  ACTION = 'ACTION',
  OPERATOR = 'OPERATOR',
  ASSERTION = 'ASSERTION',
  ROOT = 'ROOT',
}
