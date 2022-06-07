import { SetterOrUpdater } from 'recoil'

import { Comp, Norm, Schema } from '@/entities/schema'
import { DoublyLinkedList } from '@/types/common'

export interface PropertyPanelContext {
  states: {
    schemas: Norm<Schema> | null
    currentSchema: Schema
    propertyPanelComp: Comp | null
    selectedCompIds: string[]
    selectedCompSchema: Schema | null
  }
  functions: {
    setCurrentSchemaHistory: SetterOrUpdater<DoublyLinkedList<Schema>>
    setSelectedCompIds: SetterOrUpdater<string[]>
  }
}
