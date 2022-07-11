import './nav-panel.css'

import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import Nav, { NavItem } from '@/shared/nav'
import { useResize } from '@/utils/use-resize/use-resize'

const items: NavItem[] = [ROUTES.SCHEMA_LIST, ROUTES.INCIDENT_LIST].map((route) => {
  return {
    label: route.NAME,
    key: route.PATH,
    iconName: route.PAYLOAD?.iconName,
  }
})

export default function NavPanel(): JSX.Element | null {
  const navigate = useNavigate()
  const ref = useRef(null)

  const currentRoute = Object.values(ROUTES).find((route) => route.isPartOf(location.pathname))

  const { ResizeLine } = useResize({
    name: 'navPanel',
    direction: 'left',
    callapsible: true,
    size: {
      max: 777,
      min: 130,
      collapsed: 54,
    },
    ref,
  })

  function onLinkClick(item: NavItem) {
    if (item) {
      navigate(item?.key)
    }
  }

  return (
    <>
      {!ROUTES.LOGIN.isCurrent && !ROUTES.FORM_CONSTRUCTOR.isCurrent && (
        <div className="NavPanel" ref={ref}>
          {ResizeLine}
          <Nav items={items} onChange={onLinkClick} selectedKey={currentRoute?.PATH} />
        </div>
      )}
    </>
  )
}
