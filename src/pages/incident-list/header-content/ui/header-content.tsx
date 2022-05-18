import { PrimaryButton } from '@fluentui/react'

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
    <PrimaryButton
      onClick={() => {
        navigate(ROUTES.INCIDENT.PATH)
      }}
    >
      Create new
    </PrimaryButton>,
    el
  )
}
