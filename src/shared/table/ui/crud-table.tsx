import { MarqueeSelection, Selection, SelectionMode } from '@fluentui/react'

import Table, { TableProps } from './table'
import React from 'react'
import { useQuery } from 'react-query'

import apiFetch from '@/api/api-fetch'
import { useSelection } from '@/lib/use-selection'

interface CRUDTableProps extends TableProps {
  url: string
  name: string
}

type GetSchemaListParams = {
  queryKey: (string[] | string | undefined)[]
}

export default function CRUDTable(props: CRUDTableProps): JSX.Element {
  const { url, name, ...tableProps } = props
  const { selection } = useSelection<{ id: string | number }>()

  const { data } = useQuery([name], getData('GET'))

  function getData(method: 'GET' | 'DELETE') {
    return async (params: GetSchemaListParams): Promise<Record<string, unknown>[]> => {
      const { body } = await apiFetch(url, {
        method,
        body: params.queryKey[0] ? { id: params.queryKey[0] } : undefined,
      })

      return body
    }
  }

  return (
    <div className="CRUDTable">
      <MarqueeSelection selection={selection as Selection}>
        <Table
          {...tableProps}
          items={data || []}
          selectionMode={SelectionMode.multiple}
          setKey="id"
          selectionPreservedOnEmptyClick={true}
          enterModalSelectionOnTouch={true}
          selection={selection as Selection}
        />
      </MarqueeSelection>
    </div>
  )
}
