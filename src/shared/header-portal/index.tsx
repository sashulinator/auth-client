import React from 'react'
import { createPortal } from 'react-dom'

interface HeaderPortalProps {
  children: React.ReactNode
  className: string
}

export default function Portal(props: HeaderPortalProps): JSX.Element | null {
  const els = document.querySelectorAll(`.${props.className}`)

  const arr: JSX.Element[] = []

  els.forEach((el) => {
    arr.push(<>{createPortal(props.children, el)}</>)
  })

  if (els.length === 0) {
    return null
  }

  return <>{arr}</>
}
