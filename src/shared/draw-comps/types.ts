import { Comp, Norm, Schema } from '@/types/form-constructor'

export interface CompDrawerProps {
  comps: Norm<Comp>
  schemas: Norm<Schema>
}

export interface DrawerComponentProps {
  comp: Comp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schemas: Norm<Schema>
  comps: Norm<Comp>
}

export interface CompComponentFactory {
  compId: string
  comps: Norm<Comp>
  schemas: Norm<Schema>
}
