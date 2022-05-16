import { PrimaryButton, Stack } from '@fluentui/react'

import List from './list'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import Header from '@/widgets/header'

export default function SchemaListPage(): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      <Header>
        <PrimaryButton
          onClick={() => {
            navigate(ROUTES.FORM_CONSTRUCTOR.buildURL())
          }}
        >
          Create new
        </PrimaryButton>
      </Header>
      <Stack as="main" className="SchemaList">
        <List />
      </Stack>
    </>
  )
}
