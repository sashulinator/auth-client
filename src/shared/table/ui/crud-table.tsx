import { SearchBox, Selection, SelectionMode } from '@fluentui/react'

import HeaderContent from '../header-content'
import Table, { TableProps } from './table'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import apiFetch from '@/api/api-fetch'
import { useSelection } from '@/lib/use-selection'
import Dropdown from '@/shared/dropdown/ui/dropdown'
import Stack from '@/shared/stack'

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
  const [searchQuery, setFilterString] = useState('')

  const columns = props.columns.map((c) => ({ key: c.key, text: c.name }))
  const [dropdownValue, setDropdownValue] = useState(columns[0]?.key || '')

  function getData(method: 'GET' | 'DELETE') {
    return async (params: GetSchemaListParams): Promise<Record<string, unknown>[]> => {
      const { body } = await apiFetch(url, {
        method,
        body: params.queryKey[0] ? { id: params.queryKey[0] } : undefined,
      })
      return body
    }
  }

  function getElements(body: Record<string, any>[], searchQuery: string): Record<string, unknown>[] {
    return body.reduce<Record<string, unknown>[]>((acc, item) => {
      if (new RegExp(searchQuery, 'i').test(item[dropdownValue] || '')) {
        acc.push(item)
      }
      return acc
    }, [])
  }

  return (
    <Stack className="CRUDTable" tokens={{ childrenGap: 24 }}>
      <HeaderContent />
      <Stack horizontal tokens={{ childrenGap: 12 }}>
        <Stack maxWidth={250}>
          <SearchBox
            style={{ width: '250px' }}
            autoComplete="off"
            className="searchBox"
            onChange={(ev: unknown, value?: string) => setFilterString(value || '')}
          />
        </Stack>
        <Dropdown options={columns} onChange={setDropdownValue} value={dropdownValue} style={{ width: '250px' }} />
      </Stack>
      <Table
        {...tableProps}
        items={getElements(data || [], searchQuery)}
        selectionMode={SelectionMode.multiple}
        setKey="id"
        selectionPreservedOnEmptyClick={true}
        enterModalSelectionOnTouch={true}
        selection={selection as Selection}
      />
    </Stack>
  )
}
