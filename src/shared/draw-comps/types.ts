import { FormApi } from 'final-form'
import { SetterOrUpdater } from 'recoil'

import { Comp, History, Norm, Schema } from '@/common/types'

export interface CompDrawerProps {
  comps: Norm<Comp>
  schemas: Norm<Schema> | null
  bindingContext: BindingContext
}

export interface Context {
  states: {
    schemas: Norm<Schema> | null
    currentSchema: Schema
  }
  functions: {
    setCurrentSchemaHistory: SetterOrUpdater<History<Schema>>
  }
}

export type BindingContext = Context & {
  states: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formState: ReturnType<FormApi<any, any>['getState']>
  }
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
