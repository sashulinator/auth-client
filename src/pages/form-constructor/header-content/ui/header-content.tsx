import { ActionButton, Stack } from '@fluentui/react'

import SchemaContextualMenu from './contextual-menu'
import SchemaForm from './schema-form'
import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import { HEADER_PORTAL_CLASSNAME } from '@/widgets/header'

interface HeaderContentProps {
  deleteSchema: () => void | Promise<void>
  copySchema: () => void | Promise<void>
}

export default function HeaderContent(props: HeaderContentProps): JSX.Element | null {
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
      <Stack horizontalAlign="space-between" horizontal>
        <ActionButton iconProps={{ iconName: 'ChevronLeft' }} onClick={() => navigate(ROUTES.SCHEMA_LIST.PATH)}>
          Back
        </ActionButton>
      </Stack>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
        <SchemaForm />
        <SchemaContextualMenu deleteSchema={props.deleteSchema} copySchema={props.copySchema} />
      </Stack>
    </Stack>,
    el
  )
}
