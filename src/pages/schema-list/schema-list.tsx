import { Stack } from '@fluentui/react'

import HeaderContent from './header-content'
import List from './list'
import React from 'react'

import { LayoutNames, useSetLayout } from '@/lib/set-layout'

export default function SchemaListPage(): JSX.Element {
  useSetLayout(LayoutNames.headerNavMain)

  return (
    <>
      <HeaderContent />
      <Stack as="main" className="SchemaList">
        <List />
      </Stack>
    </>
  )
}
