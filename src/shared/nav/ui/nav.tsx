import { INavLink, INavLinkGroup, INavStyles, Nav as NavUI, Stack } from '@fluentui/react'
import { getCurrent } from '@savchenko91/rc-route-constant'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: '100%',
    boxSizing: 'border-box',
    // border: '1px solid #eee',
  },
}

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [ROUTES.SCHEMA_LIST, ROUTES.INCIDENT_LIST].map((route) => {
      return {
        name: route.NAME,
        url: route.PATH,
        key: route.PATH,
      }
    }),
  },
]

export default function Nav(): JSX.Element | null {
  const navigate = useNavigate()

  const currentRoute = getCurrent(ROUTES)

  function onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    ev?.preventDefault()
    if (item) {
      navigate(item?.url)
    }
  }

  return (
    <>
      {!ROUTES.LOGIN.isCurrent && !ROUTES.FORM_CONSTRUCTOR.isCurrent && (
        <Stack className="Nav">
          <NavUI
            onLinkClick={onLinkClick}
            selectedKey={currentRoute?.PATH}
            ariaLabel="Navigation"
            styles={navStyles}
            groups={navLinkGroups}
          />
        </Stack>
      )}
    </>
  )
}
