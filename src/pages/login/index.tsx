import { FC } from 'react'
import cx from 'clsx'
import { Link } from 'react-router-dom'
import ROUTES from '../../constants/routes'
import { useTranslation } from 'react-i18next'

type LoginProps = {
  className?: string
}

const Login: FC<LoginProps> = ({ className }): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className={cx('Login', className)}>
      <h1> {t('pagesNames.login')}</h1>
      <Link to={ROUTES['USERS/LIST'].buildURL()}>Users</Link>
    </div>
  )
}

export default Login
