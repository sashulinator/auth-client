import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React from 'react'
// import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import ROUTES, { getCurrentRoute } from '@/constants/routes'
import { SchemaForm } from '@/pages/form-constructor/preview'
import LanguageDropdown from '@/shared/language-dropdown'
import ThemeDropdown from '@/shared/theme'

export default function Header(): JSX.Element {
  // const { t } = useTranslation()

  // ререндерит header при изменении пути
  useLocation()

  const isFormConstructorPage = getCurrentRoute()?.PATH === ROUTES.FORM_CONSTRUCTOR.PATH

  return (
    <Stack as="header" horizontal horizontalAlign="space-between" className="Header">
      <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 10, padding: '15px 40px' }}>
        <li>
          <Link to={ROUTES.SCHEMA_LIST.buildURL()}>Schemas</Link>
        </li>
      </Stack>
      <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 20, padding: '15px 40px' }}>
        {isFormConstructorPage && (
          <li>
            <SchemaForm />
          </li>
        )}
        <li>
          <ThemeDropdown />
        </li>
        <li>
          <LanguageDropdown />
        </li>
      </Stack>
    </Stack>
  )
}
