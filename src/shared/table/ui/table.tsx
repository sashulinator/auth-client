import { DetailsList, IColumn, IColumnReorderOptions, Label, SelectionMode } from '@fluentui/react'

import './table.css'

import normilize from '../lib/normalize'
import React from 'react'

import Stack from '@/shared/stack'

interface TableProps {
  items: Record<string, unknown>[]
  columns: IColumn[]
  columnReorderOptions: IColumnReorderOptions
  label?: string
  children?: React.ReactNode
  'data-comp-id'?: string
}

export default function Table(props: TableProps): JSX.Element {
  const items = normilize<Record<string, unknown>>(props.items) ?? []
  const columns = normilize<IColumn>(props.columns) ?? []
  const columnReorderOptions = props.columnReorderOptions ?? null

  return (
    <Stack data-comp-id={props['data-comp-id']}>
      <Stack horizontal horizontalAlign="space-between">
        <Stack>{props.label && <Label>{props.label}</Label>}</Stack>
        <Stack horizontal>{props.children}</Stack>
      </Stack>
      <DetailsList
        {...props}
        items={items}
        columns={columns}
        columnReorderOptions={columnReorderOptions}
        selectionMode={SelectionMode.single}
      />
    </Stack>
  )
}
