import { Stack } from '@fluentui/react'

import React from 'react'

import componentList from '@/constants/component-list'
import SchemaDrawer, { Catalog, CompSchema } from '@/shared/schema-drawer'

interface IncidentListProps {
  schema: CompSchema
  schemas: Catalog<CompSchema>
}

function IncidentList(props: IncidentListProps): JSX.Element {
  return (
    <Stack className="IncidentList" style={{ maxWidth: '900px' }} tokens={{ padding: '32px 32px 50vh 0' }}>
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
