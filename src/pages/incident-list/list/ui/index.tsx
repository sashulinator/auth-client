import { Stack } from '@fluentui/react'
import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList'

import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getIncidentList } from '@/api/incident'
import ROUTES from '@/constants/routes'
import { Incident } from '@/entities/incident/model/types'

function List(): JSX.Element {
  const { data } = useQuery('incidents', getIncidentList)

  function renderItemColumn(item: Incident, index?: number, column?: IColumn): JSX.Element {
    const fieldContent = item[column?.fieldName as keyof Incident] as string

    if (column?.key === 'name') {
      return <Link to={ROUTES.INCIDENT.buildURL(item.id)}>{item.name}</Link>
    }
    return <span>{fieldContent}</span>
  }

  return (
    <Stack className="IncidentList">
      <DetailsList
        items={data || []}
        columns={[
          { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'description', name: 'Description', fieldName: 'description', minWidth: 100 },
        ]}
        setKey="set"
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        onRenderItemColumn={renderItemColumn}
      />
    </Stack>
  )
}

export default List
