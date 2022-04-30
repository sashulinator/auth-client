import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import './header.css'

import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ROUTES from '@/constants/routes'
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

  const selectLanguage: IDropdownProps['onChange'] = (event, item) => {
    if (typeof item?.key === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      i18n.changeLanguage(item.key)
    }
  }

  const formConstructorText = t('pagesNames.formConstructor')

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
        <li>
          <ThemeDropdown />
        </li>
        <li>
          <Dropdown
            aria-label="Change language"
            onChange={selectLanguage}
            styles={{ dropdown: { borderColor: 'red' } }}
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
