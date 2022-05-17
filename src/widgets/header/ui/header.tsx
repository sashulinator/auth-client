import { Stack } from '@fluentui/react/lib/Stack'

import RouteContent from './route-content'
import React from 'react'

import ROUTES, { getCurrentRoute } from '@/constants/routes'
import LogoutButton from '@/entities/user/ui/logout-button'
import LanguageDropdown from '@/shared/language-dropdown'
import ThemeDropdown from '@/shared/theme'

export default function Header(): JSX.Element | null {
  const currentRoute = getCurrentRoute()

  if (currentRoute?.NAME === ROUTES.LOGIN.NAME) {
    return null
  }

  return (
    <Stack
      as="header"
      horizontal
      horizontalAlign="end"
      verticalAlign="center"
      className="Header"
      tokens={{ childrenGap: 32, padding: '16px 16px' }}
    >
      <RouteContent />
      <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
        <li>
          <ThemeDropdown />
        </li>
        <li>
          <LanguageDropdown />
        </li>
        <li>
          <LogoutButton />
        </li>
      </Stack>
    </Stack>
  )
}
