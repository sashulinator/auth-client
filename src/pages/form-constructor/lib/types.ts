import { SetterOrUpdater } from 'recoil'

import { Comp, History, Norm, Schema } from '@/entities/schema'

export interface PropertyPanelContext {
  states: {
    schemas: Norm<Schema> | null
    currentSchema: Schema
    propertyPanelComp: Comp | null
    selectedCompIds: string[]
    selectedCompSchema: Schema | null
  }
  functions: {
    setCurrentSchemaHistory: SetterOrUpdater<History<Schema>>
    setSelectedCompIds: SetterOrUpdater<string[]>
  }
}
