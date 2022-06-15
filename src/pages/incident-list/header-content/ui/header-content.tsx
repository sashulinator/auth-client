import { PrimaryButton } from '@fluentui/react'

import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import Stack from '@/shared/stack'
import { HEADER_PORTAL_RIGHT_CLASSNAME } from '@/widgets/header'

export default function HeaderContent(): JSX.Element | null {
  const navigate = useNavigate()
  const el = document.querySelector(HEADER_PORTAL_RIGHT_CLASSNAME)

  if (!el) {
    return null
  }

  return createPortal(
    <Stack horizontal horizontalAlign="end" style={{ minWidth: '200px', maxWidth: '100%', paddingRight: '32px' }}>
      <PrimaryButton onClick={() => navigate(ROUTES.CREATE_INCIDENT.PATH)}>Create new</PrimaryButton>
    </Stack>,
    el
  )
}
