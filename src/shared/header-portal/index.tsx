import React from 'react'
import { createPortal } from 'react-dom'

interface HeaderPortalProps {
  children: React.ReactNode
  className: string
}

export default function Portal(props: HeaderPortalProps): JSX.Element | null {
  const els = document.querySelectorAll(`.${props.className}`)

  const arr: JSX.Element[] = []

  els.forEach((el, i) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arr.push(<React.Fragment key={i}>{createPortal(props.children, el) as any}</React.Fragment>)
  })

  if (els.length === 0) {
    return null
  }

  return <>{arr}</>
}
