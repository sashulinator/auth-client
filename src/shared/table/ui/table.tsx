import { DetailsList, IColumn } from '@fluentui/react'

import normilize from '../lib/normalize'
import React from 'react'

interface TableProps {
  items: Record<string, unknown>[]
  columns: IColumn[]
}

export default function Table(props: TableProps): JSX.Element {
  const items = normilize<Record<string, unknown>>(props.items)
  const columns = normilize<IColumn>(props.columns)

  return <DetailsList items={items} columns={columns} />
}
