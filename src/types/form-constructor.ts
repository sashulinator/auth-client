export interface Comp {
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
  children?: string[]
}

export interface Schema {
  id: string
  name: string
  title: string
  description: string
  comps: Record<string, Comp>
}
