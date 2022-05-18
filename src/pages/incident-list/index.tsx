import { Stack } from '@fluentui/react'

import HeaderContent from './header-content'
import List from './list'
import React from 'react'

export default function SchemaListPage(): JSX.Element {
  return (
    <Stack className="mainLayout">
      <HeaderContent />
      <Stack as="main" className="SchemaList">
        <List />
      </Stack>
    </Stack>
  )
}
