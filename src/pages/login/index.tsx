import { FC } from 'react'
import cx from 'clsx'
import { Link } from 'react-router-dom'
import ROUTES from '../../constants/routes'

type LoginProps = {
  className?: string
}

const Login: FC<LoginProps> = ({ className }): JSX.Element => {
  return (
    <div className={cx('Login', className)}>
      <h1>Login</h1>
      <Link to={ROUTES.USER.buildURL()}>Users</Link>
    </div>
  )
}

export default Login
