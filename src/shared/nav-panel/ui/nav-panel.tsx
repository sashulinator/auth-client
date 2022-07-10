import { Stack } from '@fluentui/react'

import './nav-panel.css'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import Nav, { NavItem } from '@/shared/nav'

const items: NavItem[] = [ROUTES.SCHEMA_LIST, ROUTES.INCIDENT_LIST].map((route) => {
  return {
    label: route.NAME,
    key: route.PATH,
    iconName: route.PAYLOAD?.iconName,
  }
})

export default function NavPanel(): JSX.Element | null {
  const navigate = useNavigate()

  const currentRoute = Object.values(ROUTES).find((route) => route.isPartOf(location.pathname))

  function onLinkClick(item: NavItem) {
    if (item) {
      navigate(item?.key)
    }
  }

  return (
    <>
      {!ROUTES.LOGIN.isCurrent && !ROUTES.FORM_CONSTRUCTOR.isCurrent && (
        <Stack className="NavPanel">
          <Nav items={items} onChange={onLinkClick} selectedKey={currentRoute?.PATH} />
        </Stack>
      )}
    </>
  )
}
