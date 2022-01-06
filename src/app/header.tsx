import { FC } from 'react'
import cx from 'clsx'
import './header.css'
import { Link } from 'react-router-dom'
import ROUTES from '../constants/routes'
import { Stack } from '@fluentui/react/lib/Stack'

type HeaderProps = {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }): JSX.Element => {
  return (
    <header className={cx('Header', className)}>
      <Stack
        as="ul"
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 10, padding: '15px 40px' }}
      >
        <li>
          <Link to={ROUTES['USERS/LIST'].buildURL()}>users</Link>
        </li>
        <li>
          <Link to={ROUTES['USERS/CREATE'].buildURL()}>create users</Link>
        </li>
        <li>
          <Link to={ROUTES.LOGIN.buildURL()}>login</Link>
        </li>
      </Stack>
    </header>
  )
}

export default Header
