import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import { Button } from '@/shared/button'
import Stack from '@/shared/stack'
import { HEADER_PORTAL_LEFT_CLASSNAME } from '@/widgets/header'

interface HeaderContentProps {
  deleteDisabled: boolean
}

export default function HeaderContent(props: HeaderContentProps): JSX.Element | null {
  const navigate = useNavigate()
  const el = document.querySelector(HEADER_PORTAL_LEFT_CLASSNAME)

  if (!el) {
    return null
  }

  return (
    <>
      {createPortal(
        <Stack
          horizontal
          horizontalAlign="end"
          style={{ maxWidth: '100%', padding: '0 32px' }}
          tokens={{ childrenGap: 12 }}
        >
          <Button
            onClick={() => {
              navigate(ROUTES.CREATE_INCIDENT.PATH)
            }}
            text="t.buttons.create"
          />
          <Button variant="action" text="t.buttons.delete" disabled={props.deleteDisabled} />
        </Stack>,
        el
      )}
    </>
  )
}
