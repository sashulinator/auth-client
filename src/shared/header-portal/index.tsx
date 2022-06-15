import React from 'react'
import { createPortal } from 'react-dom'

interface HeaderPortalProps {
  children: React.ReactNode
  className: string
}

export default function Portal(props: HeaderPortalProps): JSX.Element | null {
  const el = document.querySelector(`.${props.className}`)

  if (!el) {
    return null
  }

  return createPortal(props.children, el)
}
