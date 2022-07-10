import { Stack } from '@fluentui/react'

import HeaderContent from './header-content'
import List from './list'
import React from 'react'

import { useGetDependencySchemas } from '@/api/comp-schema'
import { LayoutNames, useSetLayout } from '@/lib/set-layout'

const IncidentTableId = 'cb4c3d8d-bd2a-4dd5-8bd7-b76d10e99a71'

export default function SchemaListPage(): JSX.Element {
  useSetLayout(LayoutNames.headerNavMain)

  const { data: schemas } = useGetDependencySchemas([IncidentTableId])

  const schema = schemas?.[IncidentTableId]

  return (
    <>
      <HeaderContent />
      <Stack as="main" className="IncidentList">
        {schema && schemas && <List schema={schema} schemas={schemas} />}
      </Stack>
    </>
  )
}
