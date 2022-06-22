import React from 'react'

import { Binding, Catalog, Schema } from '@/shared/schema-drawer'

interface DimensionTreeProps {
  id: string
  schemas: Catalog<Schema<Binding>>
}

export default function DimensionTree(props: DimensionTreeProps): JSX.Element {
  return <div className="DimensionTree">{props.id}</div>
}
