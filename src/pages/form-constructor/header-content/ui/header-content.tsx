import { ActionButton, Stack } from '@fluentui/react'

import SchemaContextualMenu from './contextual-menu'
import SchemaForm from './schema-form'
import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import { HEADER_PORTAL_LEFT_CLASSNAME, HEADER_PORTAL_RIGHT_CLASSNAME } from '@/widgets/header'

interface HeaderContentProps {
  deleteSchema: () => void | Promise<void>
  copySchema: () => void | Promise<void>
}

export default function HeaderContent(props: HeaderContentProps): null | JSX.Element {
  const navigate = useNavigate()
  const elLeft = document.querySelector(HEADER_PORTAL_LEFT_CLASSNAME)
  const elRight = document.querySelector(HEADER_PORTAL_RIGHT_CLASSNAME)

  if (!elLeft || !elRight) {
    return null
  }

  return (
    <>
      {createPortal(
        <Stack horizontal horizontalAlign="start">
          <ActionButton iconProps={{ iconName: 'ChevronLeft' }} onClick={() => navigate(ROUTES.SCHEMA_LIST.PATH)}>
            Back
          </ActionButton>
        </Stack>,
        elLeft
      )}
      {createPortal(
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6, padding: '0 32px 0 0' }}>
          <SchemaForm />
          <SchemaContextualMenu deleteSchema={props.deleteSchema} copySchema={props.copySchema} />
        </Stack>,
        elRight
      )}
    </>
  )
}
