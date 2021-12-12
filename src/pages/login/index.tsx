import { FC } from 'react'
import cx from 'clsx'
import { Link } from 'react-router-dom'

type LoginProps = {
  className?: string
}

const Login: FC<LoginProps> = ({ className }): JSX.Element => {
  return (
    <div className={cx('Login', className)}>
      Login
      <Link to="/users/me">Users</Link>
    </div>
  )
}

export default Login
