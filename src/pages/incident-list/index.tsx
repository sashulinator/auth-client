import { Stack } from '@fluentui/react'

import List from './list'
import React from 'react'

export default function SchemaListPage(): JSX.Element {
  return (
    <Stack className="mainLayout">
      <Stack as="main" className="SchemaList">
        <List />
      </Stack>
    </Stack>
  )
}
