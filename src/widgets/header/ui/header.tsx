import { Icon, Persona, PersonaSize } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React from 'react'
import { Link } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import LogoutButton from '@/entities/user/ui/logout-button'

export const HEADER_PORTAL_LEFT_CLASSNAME = '.headerPortalLeft'
export const HEADER_PORTAL_CENTER_CLASSNAME = '.headerPortalCenter'
export const HEADER_PORTAL_RIGHT_CLASSNAME = '.headerPortalRight'

export default function Header(): JSX.Element | null {
  if (ROUTES.LOGIN.isCurrent) {
    return null
  }

  return (
    <Stack as="header" horizontal verticalAlign="center" className="Header" tokens={{ padding: '16px 16px' }}>
      <div
        className="logo"
        style={{ minWidth: 'calc(var(--navPanel_size) * 1px)', maxWidth: 'calc(var(--navPanel_size) * 1px)' }}
      >
        <Icon iconName="DataTech" />
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
              text="Юрий Кнорозов"
              size={PersonaSize.size32}
              imageUrl="https://upload.wikimedia.org/wikipedia/ru/thumb/4/4c/%D0%AE%D1%80%D0%B8%D0%B9_%D0%9A%D0%BD%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2.jpg/548px-%D0%AE%D1%80%D0%B8%D0%B9_%D0%9A%D0%BD%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2.jpg"
            />
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </Stack>
    </Stack>
  )
}
