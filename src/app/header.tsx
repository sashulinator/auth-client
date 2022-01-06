import { FC } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import ROUTES from '../constants/routes'
import { Stack } from '@fluentui/react/lib/Stack'
import { useTranslation } from 'react-i18next'

const Header: FC = (): JSX.Element => {
  const { t, i18n } = useTranslation()

  return (
    <Stack as="header" className="Header">
      <Stack
        as="ul"
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 10, padding: '15px 40px' }}
      >
        <li>
          <Link to={ROUTES['USERS/LIST'].buildURL()}>
            {t('pagesNames.userList')}
          </Link>
        </li>
        <li>
          <Link to={ROUTES['USERS/CREATE'].buildURL()}>
            {t('pagesNames.createUser')}
          </Link>
        </li>
        <li>
          <Link to={ROUTES.LOGIN.buildURL()}>{t('pagesNames.login')}</Link>
        </li>
        <li>
          <button onClick={() => i18n.changeLanguage('ru')}>
            {t('buttons.ok')}
          </button>
        </li>
      </Stack>
    </Stack>
  )
}

export default Header
