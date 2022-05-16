import { PrimaryButton } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React from 'react'
// import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import ROUTES, { getCurrentRoute } from '@/constants/routes'
import { SchemaForm } from '@/pages/form-constructor/preview'
import LanguageDropdown from '@/shared/language-dropdown'
import ThemeDropdown from '@/shared/theme'

interface HeaderProps {
  children?: React.ReactChild
}

export default function Header(props: HeaderProps): JSX.Element {
  // const { t } = useTranslation()

  // ререндерит header при изменении пути
  useLocation()
  const navigate = useNavigate()

  const isFormConstructorPage = getCurrentRoute()?.PATH === ROUTES.FORM_CONSTRUCTOR.PATH

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate(ROUTES.LOGIN.buildURL())
  }

  return (
    <>
      <div className="fakeHeader" />
      <Stack as="header" horizontal horizontalAlign="space-between" className="Header">
        <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 10, padding: '15px 40px' }}>
          {isFormConstructorPage && (
            <li>
              <Link to={ROUTES.SCHEMA_LIST.buildURL()}>{'< Back'}</Link>
            </li>
          )}
        </Stack>
        <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 20, padding: '15px 40px' }}>
          {isFormConstructorPage && (
            <li>
              <SchemaForm />
            </li>
          )}
          <>{props.children}</>
          <li>
            <ThemeDropdown />
          </li>
          <li>
            <LanguageDropdown />
          </li>
          <li>
            <PrimaryButton onClick={logout}>Logout</PrimaryButton>
          </li>
        </Stack>
      </Stack>
    </>
  )
}
