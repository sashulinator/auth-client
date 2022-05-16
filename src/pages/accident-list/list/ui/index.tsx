import { Stack } from '@fluentui/react'

// import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList'
import React from 'react'

// import { useQuery } from 'react-query'
// import { Link } from 'react-router-dom'

// import { getSchemaList } from '@/api/schema'
// import ROUTES from '@/constants/routes'
// import { Schema } from '@/entities/schema'

function List(): JSX.Element {
  // const { data } = useQuery('schemas', getSchemaList)

  // function renderItemColumn(item: Schema, index?: number, column?: IColumn): JSX.Element {
  //   const fieldContent = item[column?.fieldName as keyof Schema] as string

  //   if (column?.key === 'title') {
  //     return <Link to={ROUTES.FORM_CONSTRUCTOR.buildURL(item.id)}>{item.title}</Link>
  //   }
  //   return <span>{fieldContent}</span>
  // }

  return (
    <Stack className="AccidentList">
      AccidentList
      {/* <DetailsList
        items={data || []}
        columns={[
          { key: 'title', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'description', name: 'Description', fieldName: 'description', minWidth: 100 },
        ]}
        setKey="set"
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        onRenderItemColumn={renderItemColumn}
      /> */}
    </Stack>
  )
}

export default List
