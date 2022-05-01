import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import ROUTES, { getCurrentRoute } from '@/constants/routes'
import { SchemaForm } from '@/pages/form-constructor/preview'
import ThemeDropdown from '@/shared/theme'

const options: IDropdownOption[] = [
  {
    text: 'Русский',
    key: 'ru',
  },
  {
    text: 'English',
    key: 'en',
  },
]

const Header: FC = (): JSX.Element => {
  const { t, i18n } = useTranslation()

  // ререндерит header при изменении пути
  useLocation()

  const selectLanguage: IDropdownProps['onChange'] = (event, item) => {
    if (typeof item?.key === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      i18n.changeLanguage(item.key)
    }
  }

  const formConstructorText = t('pagesNames.formConstructor')

  const isFormConstructorPage = getCurrentRoute()?.PATH === ROUTES.FORM_CONSTRUCTOR.PATH

  return (
    <Stack as="header" horizontal horizontalAlign="space-between" className="Header">
      <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 10, padding: '15px 40px' }}>
        <li>
          <Link to={ROUTES.FORM_CONSTRUCTOR.buildURL()}>{formConstructorText}</Link>
        </li>
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
          <Dropdown
            styles={{ root: { width: '90px' } }}
            aria-label="Change language"
            onChange={selectLanguage}
            defaultValue={i18n.language}
            defaultSelectedKey={i18n.language}
            placeholder="language"
            options={options}
          />
        </li>
      </Stack>
    </Stack>
  )
}

export default Header
