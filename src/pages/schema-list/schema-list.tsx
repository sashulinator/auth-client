import { Stack } from '@fluentui/react'

import List from './list'
import React from 'react'

import { LayoutNames, useSetLayout } from '@/lib/set-layout'

export default function SchemaListPage(): JSX.Element {
  useSetLayout(LayoutNames.headerNavMain)

  return (
    <>
      <Stack as="main" className="SchemaList">
        <List />
      </Stack>
    </>
  )
}
