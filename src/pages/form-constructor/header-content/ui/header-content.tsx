import { ActionButton, Stack } from '@fluentui/react'

import SchemaForm from './schema-form'
import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import { HEADER_PORTAL_CLASSNAME } from '@/widgets/header'

export default function HeaderContent(): JSX.Element | null {
  const navigate = useNavigate()
  const el = document.querySelector(HEADER_PORTAL_CLASSNAME)

  if (!el) {
    return null
  }

  return createPortal(
    <Stack
      className="HeaderContent"
      verticalAlign="center"
      horizontalAlign="space-between"
      horizontal
      style={{ width: '100%' }}
    >
      <Stack horizontalAlign="space-between">
        <ActionButton iconProps={{ iconName: 'ChevronLeft' }} onClick={() => navigate(ROUTES.SCHEMA_LIST.PATH)}>
          Back
        </ActionButton>
      </Stack>
      <Stack>
        <SchemaForm />
      </Stack>
    </Stack>,
    el
  )
}
