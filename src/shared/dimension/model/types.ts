export interface Dimension {
  id: string | 'ROOT_ID'
  title: string
  children: string[]
  expiredAt: string
  description: string
}

export interface DimensionSchema {
  title: string
  isActive: boolean
  multi: boolean
  required: boolean
  comps: {
    [id: string]: Dimension
  }
}
