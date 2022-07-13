import { Stack } from '@fluentui/react'

import React from 'react'

import componentList from '@/constants/component-list'
import SchemaDrawer, { CompSchema, Dictionary } from '@/shared/schema-drawer'

interface IncidentListProps {
  schema: CompSchema
  schemas: Dictionary<CompSchema>
}

function IncidentList(props: IncidentListProps): JSX.Element {
  return (
    <Stack className="IncidentList" tokens={{ padding: '0 0 50vh 0' }}>
      <SchemaDrawer
        componentList={componentList}
        schema={props.schema}
        schemas={props.schemas}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context={{ form: {} } as any}
      />
    </Stack>
  )
}

export default IncidentList
