import { IColumn, SearchBox, Selection, SelectionMode } from '@fluentui/react'

import HeaderContent from './header-content'
import Table, { TableProps } from './table'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import apiFetch from '@/api/api-fetch'
import ROUTES from '@/constants/routes'
import { useSelection } from '@/lib/use-selection'
import Dropdown from '@/shared/dropdown/ui/dropdown'
import Stack from '@/shared/stack'
import { AnyRecord } from '@/types/common'

interface CRUDTableProps extends TableProps {
  url: string
  name: string
  idKey: string
}

type GetSchemaListParams = {
  queryKey: (string[] | string | undefined)[]
}

CRUDTable.defaultProps = {
  idKey: 'id',
}

export default function CRUDTable(props: CRUDTableProps): JSX.Element {
  const { url, name, ...tableProps } = props
  const { selection, selectedItems } = useSelection<{ id: string | number }>([], props.idKey)

  const { data } = useQuery([name], getData('GET'))
  const [searchQuery, setFilterString] = useState('')

  const columns = props.columns.map((c) => ({ key: c.key, text: c.name }))
  const [dropdownValue, setDropdownValue] = useState(columns[0]?.key || '')

  function getData(method: 'GET' | 'DELETE') {
    return async (params: GetSchemaListParams): Promise<Record<string, unknown>[]> => {
      const { body } = await apiFetch(url, {
        method,
        body: params.queryKey[0] ? { [props.idKey]: params.queryKey[0] } : undefined,
      })
      return body.dataBlock
    }
  }

  function buildItems(body: AnyRecord[], searchQuery: string): Record<string, unknown>[] {
    return body.reduce<AnyRecord[]>((acc, item) => {
      if (!item[dropdownValue]) {
        acc.push(item)
        return acc
      }

      if (new RegExp(searchQuery, 'i').test(item[dropdownValue] || '')) {
        acc.push(item)
      }
      return acc
    }, [])
  }

  function renderItemColumn(item: AnyRecord, index?: number, column?: IColumn) {
    const fieldContent = item[column?.fieldName as keyof AnyRecord] as string
    if (column?.key === columns?.[0]?.key) {
      return <Link to={ROUTES.INCIDENT.PATH.replace(':id', item[props.idKey])}>{item[column?.key || '']}</Link>
    }
    return <span>{fieldContent}</span>
  }

  return (
    <Stack className="CRUDTable" tokens={{ childrenGap: 24 }}>
      <HeaderContent deleteDisabled={selectedItems.length === 0} />
      {data === undefined || data.length === 0 ? (
        <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{ height: '300px' }}>
          Nothing found
        </Stack>
      ) : (
        <>
          <Stack horizontal tokens={{ childrenGap: 12 }}>
            <Stack tokens={{ maxWidth: 250 }}>
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
            items={buildItems(data || [], searchQuery)}
            selectionMode={SelectionMode.multiple}
            selection={selection as Selection}
            setKey={props.idKey}
            selectionPreservedOnEmptyClick={true}
            enterModalSelectionOnTouch={true}
            onRenderItemColumn={renderItemColumn}
          />
        </>
      )}
    </Stack>
  )
}
