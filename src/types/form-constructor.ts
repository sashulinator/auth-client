// Comp

export interface BaseComp {
  id: string
  componentSchemaId: string
  componentName: string
  name: string
  type: string
  path: string
  defaultValue?: string
  props?: Record<string, unknown>
  bindings?: {
    events: string[]
    actions: string[]
    componentIds: string[]
  }[]
}

export interface Comp extends BaseComp {
  children?: string[]
}

export interface NormComp extends BaseComp {
  children?: string[]
  indexInArray: number
}

export interface HierarchyComp extends BaseComp {
  children?: HierarchyComp[]
}

export type NormComps = Record<string, NormComp>

// Schema

export interface BaseSchema {
  id: string
  name: string
  title: string
  description: string
}

export interface CompSchema extends BaseSchema {
  schema: BaseComp[]
}

export type NormCompSchemas = Record<string, CompSchema>

export interface NormFormSchema extends BaseSchema {
  schema: NormComps
}

export interface FormSchema extends BaseSchema {
  schema: Comp[]
}
