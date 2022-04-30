import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList'
import { assertNotNil } from '@savchenko91/schema-validator'

import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import { Schema } from '@/types/form-constructor'

async function getSchemas(): Promise<Schema[]> {
  const response = await fetch('/api/v1/schemas')
  if (!response.ok) {
    throw new Error('Problem fetching data')
  }
  const schemas = await response.json()

  // TODO провалидировать схемы

  assertNotNil(schemas)

  return schemas as Schema[]
}

function List(): JSX.Element {
  const { data } = useQuery('schemas', getSchemas)

  function renderItemColumn(item: Schema, index?: number, column?: IColumn): JSX.Element {
    const fieldContent = item[column?.fieldName as keyof Schema] as string

    if (column?.key === 'name') {
      return <Link to={ROUTES.FORM_CONSTRUCTOR.buildURL(item.id)}>{item.name}</Link>
    }
    return <span>{fieldContent}</span>
  }

  return (
    <div className="SchemaList">
      <DetailsList
        items={data || []}
        columns={[
          { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'title', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'description', name: 'Description', fieldName: 'description', minWidth: 100 },
        ]}
        setKey="set"
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        onRenderItemColumn={renderItemColumn}
      />
    </div>
  )
}

export default List
