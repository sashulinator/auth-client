import { Stack } from '@fluentui/react'

import List from './list'
import React from 'react'

import Header from '@/widgets/header'

function SchemaListPage(): JSX.Element {
  return (
    <>
      <Header />
      <Stack as="main" className="SchemaList">
        <List />
      </Stack>
    </>
  )
}

export default SchemaListPage
