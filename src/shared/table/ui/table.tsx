import { DetailsList, IColumn, IDetailsListProps, Label } from '@fluentui/react'

import './table.css'

import normilize from '../lib/normalize'
import React from 'react'

import Stack from '@/shared/stack'

export interface TableProps extends IDetailsListProps {
  items: Record<string, unknown>[]
  columns: IColumn[]
  label?: string
  children?: React.ReactNode
  'data-comp-id'?: string
}

export default function Table(props: TableProps): JSX.Element {
  const items = normilize<Record<string, unknown>>(props.items) ?? []
  const columns = normilize<IColumn>(props.columns) ?? []

  return (
    <Stack data-comp-id={props['data-comp-id']} className="Table">
      <Stack horizontal horizontalAlign="space-between" verticalAlign="end">
        <Stack>{props.label && <Label>{props.label}</Label>}</Stack>
        <Stack horizontal className="buttons">
          {props.children}
        </Stack>
      </Stack>
      <div className="wrapper">
        <DetailsList {...props} items={items} columns={columns} />
      </div>
    </Stack>
  )
}
