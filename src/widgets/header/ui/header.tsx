import { Icon, Persona, PersonaSize } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import LogoutButton from '@/entities/user/ui/logout-button'

export const HEADER_PORTAL_LEFT_CLASSNAME = '.headerPortalLeft'
export const HEADER_PORTAL_CENTER_CLASSNAME = '.headerPortalCenter'
export const HEADER_PORTAL_RIGHT_CLASSNAME = '.headerPortalRight'

export default function Header(): JSX.Element | null {
  // ререндерит хеадер при смене урла
  useLocation()
  const role = localStorage.getItem('userRole') || ''

  if (ROUTES.LOGIN.isCurrent) {
    return null
  }

  return (
    <header>
      <Stack horizontal verticalAlign="center" className="Header" style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            minWidth: 'calc((var(--navPanel_size) - var(--horizontalHeaderPadding)) * 1px)',
            maxWidth: 'calc((var(--navPanel_size) - var(--horizontalHeaderPadding)) * 1px)',
          }}
        >
          <div className="logo">
            <Icon iconName="Logo" />
          </div>
          <div
            className="miniLogo"
            style={{
              transform: 'scale(0.4) translateX(-65px) translateY(-120%)',
            }}
          >
            <Icon iconName="MiniLogo" />
          </div>
        </div>
        <Stack style={{ width: '100%', background: 'var(--white)' }}>
          <Stack
            horizontal
            className={HEADER_PORTAL_LEFT_CLASSNAME.replace('.', '')}
            horizontalAlign="start"
            verticalAlign="center"
            style={{ width: '100%' }}
          />
          <Stack
            horizontal
            className={HEADER_PORTAL_CENTER_CLASSNAME.replace('.', '')}
            horizontalAlign="start"
            verticalAlign="center"
            style={{ width: '100%' }}
          />
          <Stack
            horizontal
            className={HEADER_PORTAL_RIGHT_CLASSNAME.replace('.', '')}
            horizontalAlign="end"
            verticalAlign="center"
            style={{ width: 'fit-content' }}
          />
        </Stack>
        <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
          <li>
            <Link to={ROUTES.USER_PROFILE.PATH}>
              <Persona
                text={role}
                size={PersonaSize.size32}
                imageUrl={
                  role === 'USER'
                    ? 'https://alfabank.gcdn.co/media/footer-alfa-logo_1025x1025_common_19-01-2021.svg'
                    : 'https://lh3.googleusercontent.com/zxWE_cAZikUWIEUG4ISM7FOsB0dB4xpQJryQXyxLz7cJ7XFkp0sSWxH5r52nNOwkXtU'
                }
              />
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </Stack>
      </Stack>
    </header>
  )
}
