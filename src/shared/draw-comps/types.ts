import { FormApi } from 'final-form'
import { SetterOrUpdater } from 'recoil'

import { Comp, History, Norm, Schema } from '@/common/types'

export interface CompDrawerProps {
  comps: Norm<Comp>
  schemas: Norm<Schema>
  bindingContext: BindingContext
}

export interface Context {
  CSchemas: Norm<Schema>
  currentSchemaHistory: History<Schema>
  setCurrentSchemaHistory: SetterOrUpdater<History<Schema>>
}

export interface BindingContext extends Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<any, any>
}

export interface DrawerComponentProps {
  comp: Comp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schemas: Norm<Schema>
  comps: Norm<Comp>
  bindingContext: BindingContext
}

export interface CompComponentFactory {
  compId: string
  comps: Norm<Comp>
  schemas: Norm<Schema>
  bindingContext: BindingContext
}
