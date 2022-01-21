import { Dropdown, IDropdownOption, IDropdownProps } from '@fluentui/react'
import { Stack } from '@fluentui/react/lib/Stack'

import ROUTES from '../constants/routes'
import './header.css'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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

  return (
    <Stack as="header" horizontal horizontalAlign="space-between" className="Header">
      <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 10, padding: '15px 40px' }}>
        <li>
          <Link to={ROUTES['USERS/LIST'].buildURL()}>{t('pagesNames.userList')}</Link>
        </li>
      </Stack>
      <Stack as="ul" horizontal verticalAlign="center" tokens={{ childrenGap: 20, padding: '15px 40px' }}>
        <li>
          <Link to={ROUTES.LOGIN.buildURL()}>{t('pagesNames.login')}</Link>
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
