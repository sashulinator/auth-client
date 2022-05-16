import { INavLink, INavLinkGroup, INavStyles, Nav as NavUI } from '@fluentui/react'

import React from 'react'
import { useNavigate } from 'react-router-dom'

import ROUTES, { getCurrentRoute } from '@/constants/routes'

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
    links: [ROUTES.LOGIN, ROUTES.SCHEMA_LIST, ROUTES.ACCIDENT_LIST].map((route) => {
      return {
        name: route.NAME,
        url: route.buildURL(),
        key: route.PATH,
      }
    }),
  },
]

export default function Nav(): JSX.Element | null {
  const currentRoute = getCurrentRoute()
  const navigate = useNavigate()

  function onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    ev?.preventDefault()
    if (item) {
      navigate(item?.url)
    }
  }

  if (!currentRoute) {
    return null
  }

  return (
    <>
      {[ROUTES.SCHEMA_LIST.NAME, ROUTES.ACCIDENT_LIST.NAME].includes(currentRoute?.NAME) && (
        <>
          <div className="fakeNav" />
          <div className="Nav">
            <NavUI
              onLinkClick={onLinkClick}
              selectedKey={currentRoute?.PATH}
              ariaLabel="Navigation"
              styles={navStyles}
              groups={navLinkGroups}
            />
          </div>
        </>
      )}
    </>
  )
}
