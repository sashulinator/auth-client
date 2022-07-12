import { Icon, Persona, PersonaSize } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'

import api from '@/api/api-axios'
import { LoginResponse, Transfer } from '@/api/types'
import ROUTES from '@/constants/routes'
import LogoutButton from '@/entities/user/ui/logout-button'

export const HEADER_PORTAL_LEFT_CLASSNAME = '.headerPortalLeft'
export const HEADER_PORTAL_CENTER_CLASSNAME = '.headerPortalCenter'
export const HEADER_PORTAL_RIGHT_CLASSNAME = '.headerPortalRight'

export default function Header(): JSX.Element | null {
  // ререндерит хеадер при смене урла
  useLocation()
  const { data } = useQuery(['refresh'], () => api.post<Transfer<LoginResponse>>('/api/auth/refresh'))

  if (ROUTES.LOGIN.isCurrent) {
    return null
  }

  return (
    <header>
      <Stack
        horizontal
        verticalAlign="center"
        className="Header"
        tokens={{ padding: '16px 16px' }}
        style={{ width: '100%', height: '100%' }}
      >
        <div
          style={{
            minWidth: 'calc(var(--navPanel_size) * 1px)',
            maxWidth: 'calc(var(--navPanel_size) * 1px)',
          }}
        >
          <div className="logo">
            <Icon iconName="Logo" />
          </div>
          <div
            className="miniLogo"
            style={{
              transform: 'scale(0.5) translateX(-40px) translateY(-100%)',
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
                text={data?.data.dataBlock.role}
                size={PersonaSize.size32}
                imageUrl={
                  data?.data.dataBlock.role === 'USER'
                    ? 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4c/%D0%AE%D1%80%D0%B8%D0%B9_%D0%9A%D0%BD%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2.jpg/548px-%D0%AE%D1%80%D0%B8%D0%B9_%D0%9A%D0%BD%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2.jpg'
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
