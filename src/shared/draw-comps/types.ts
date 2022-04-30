import { Comp, Norm } from '@/types/form-constructor'

export interface CompDrawerProps {
  comps: Norm<Comp>
}

export interface DrawerComponentProps extends CompDrawerProps {
  comp: Comp
}

export interface CompComponentFactory {
  compId: string
  comps: Norm<Comp>
}
