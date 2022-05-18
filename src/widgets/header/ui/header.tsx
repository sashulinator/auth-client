import { Stack } from '@fluentui/react/lib/Stack'

import React from 'react'

import ROUTES from '@/constants/routes'
import LogoutButton from '@/entities/user/ui/logout-button'
import LanguageDropdown from '@/shared/language-dropdown'
import ThemeDropdown from '@/shared/theme'

export const HEADER_PORTAL_CLASSNAME = '.headerPortal'

export default function Header(): JSX.Element | null {
  if (ROUTES.LOGIN.isCurrent) {
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
      <Stack
        horizontal
        className={HEADER_PORTAL_CLASSNAME.replace('.', '')}
        horizontalAlign="end"
        verticalAlign="center"
        style={{ width: '100%' }}
      />
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
