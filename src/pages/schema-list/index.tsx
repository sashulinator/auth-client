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
      <Header />
      <Stack as="main" className="SchemaList">
        <Stack horizontal tokens={{ padding: '20px 20px' }} horizontalAlign="end">
          <PrimaryButton
            onClick={() => {
              navigate(ROUTES.FORM_CONSTRUCTOR.buildURL())
            }}
          >
            Create new
          </PrimaryButton>
        </Stack>
        <List />
      </Stack>
    </>
  )
}
