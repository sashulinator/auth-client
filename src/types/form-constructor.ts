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

export interface Norm {
  indexInArray: number
}

export interface Comp extends BaseComp {
  children?: string[]
}

export interface NormComp extends BaseComp, Norm {
  children?: string[]
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
  schema: Comp[]
}

// TODO удалить лишние
export interface NormCompSchema extends BaseSchema {
  schema: NormComp[]
}

export type NormCompSchemas = Record<string, NormCompSchema>

export interface NormFormSchema extends BaseSchema, Norm {
  schema: NormComps
}

export interface FormSchema extends BaseSchema {
  schema: Comp[]
}
