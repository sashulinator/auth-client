import { FormApi } from 'final-form'
import { SetterOrUpdater } from 'recoil'

import { Comp, History, Norm, Schema } from '@/common/types'

export interface CompDrawerProps {
  comps: Norm<Comp>
  bindingContext: BindingContext
}

export interface InitialContext {
  states: {
    schemas: Norm<Schema> | null
    currentSchema: Schema
    selectedComp: Comp | null
    selectedCompIds: string[]
    selectedCompSchema: Schema | null
  }
  functions: {
    setCurrentSchemaHistory: SetterOrUpdater<History<Schema>>
    setSelectedCompIds: SetterOrUpdater<string[]>
  }
}

export interface Context extends InitialContext {
  states: {
    schemas: Norm<Schema>
    currentSchema: Schema
    selectedComp: Comp | null
    selectedCompSchema: Schema | null
    selectedCompIds: string[]
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
