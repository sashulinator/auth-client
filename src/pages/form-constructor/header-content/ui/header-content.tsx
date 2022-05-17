import { ActionButton, Stack } from '@fluentui/react'

import SchemaForm from './schema-form'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'

export default function HeaderContent(): JSX.Element {
  const navigate = useNavigate()

  return (
    <Stack
      className="HeaderContent"
      verticalAlign="center"
      horizontalAlign="space-between"
      horizontal
      style={{ width: '100%' }}
    >
      <Stack horizontalAlign="space-between">
        <ActionButton iconProps={{ iconName: 'ChevronLeft' }} onClick={() => navigate(ROUTES.SCHEMA_LIST.buildURL())}>
          Back
        </ActionButton>
      </Stack>
      <Stack>
        <SchemaForm />
      </Stack>
    </Stack>
  )
}
