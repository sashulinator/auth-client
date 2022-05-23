import { DetailsList, IColumn, IColumnReorderOptions } from '@fluentui/react'

import './table.css'

import normilize from '../lib/normalize'
import React from 'react'

interface TableProps {
  items: Record<string, unknown>[]
  columns: IColumn[]
  columnReorderOptions: IColumnReorderOptions
}

export declare enum SelectionMode {
  none = 0,
  single = 1,
  multiple = 2,
}

export default function Table(props: TableProps): JSX.Element {
  const items = normilize<Record<string, unknown>>(props.items) ?? []
  const columns = normilize<IColumn>(props.columns) ?? []
  const columnReorderOptions = props.columnReorderOptions ?? null

  return <DetailsList {...props} items={items} columns={columns} columnReorderOptions={columnReorderOptions} />
}

//  Table.defaultProps = {
//    selectionMode: SelectionMode.none,
//   }
