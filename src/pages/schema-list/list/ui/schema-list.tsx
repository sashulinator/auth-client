import { SearchBox, Stack } from '@fluentui/react'
import { IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList'

import HeaderContent from './header-content'
import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getCompSchemaList } from '@/api/comp-schema'
import ROUTES from '@/constants/routes'
import { useSelection } from '@/lib/use-selection'
import { Dropdown } from '@/shared/dropdown'
import LoadingAria from '@/shared/loading-aria'
import { CompSchema } from '@/shared/schema-drawer'
import Table from '@/shared/table'
import { AnyRecord } from '@/types/common'

function List(): JSX.Element {
  const columns = [
    {
      key: 'title',
      text: 'Title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    { key: 'type', text: 'Type', name: 'Type', fieldName: 'type', minWidth: 100 },
  ]

  const [searchQuery, setFilterString] = useState('')
  const { data, isLoading } = useQuery('schemas', getCompSchemaList)
  const { selection, selectedItems } = useSelection<{ id: string | number }>([], 'id')
  const [dropdownValue, setDropdownValue] = useState(columns[0]?.key || '')

  const items = useMemo(() => buildItems(data?.sort((a, b) => (a.type > b.type ? 1 : -1)) || [], searchQuery), [
    data,
    searchQuery,
  ])

  function renderItemColumn(item: CompSchema, index?: number, column?: IColumn): JSX.Element {
    const fieldContent = item[column?.fieldName as keyof CompSchema] as string

    if (column?.key === 'title') {
      return <Link to={ROUTES.FORM_CONSTRUCTOR_EDIT.PATH.replace(':id', item.id)}>{item.title}</Link>
    }
    return <span>{fieldContent}</span>
  }

  if (isLoading) {
    return <LoadingAria loading={isLoading} label="Schema loading..." />
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

  return (
    <Stack
      className="SchemaList"
      style={{ maxWidth: '1024px' }}
      tokens={{ padding: '32px 32px 50vh 32px', childrenGap: 24 }}
    >
      <HeaderContent deleteDisabled={selectedItems.length === 0} />
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
      {items === undefined || items.length === 0 ? (
        <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{ height: '300px' }}>
          Nothing found
        </Stack>
      ) : (
        <Table
          columns={columns}
          setKey="set"
          items={items}
          selectionMode={SelectionMode.multiple}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          selection={selection as any}
          onRenderItemColumn={renderItemColumn}
        />
      )}
    </Stack>
  )
}

export default List
