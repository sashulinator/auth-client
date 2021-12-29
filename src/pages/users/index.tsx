import { FC } from 'react'
import { Link } from 'react-router-dom'
import cx from 'clsx'
import ROUTES from '../../constants/routes'

type UsersProps = {
  className?: string
}

const Users: FC<UsersProps> = ({ className }): JSX.Element => {
  return (
    <div className={cx('Users', className)}>
      <h1>Users</h1>
      <nav>
        <Link to={ROUTES.LOGIN.buildURL()}>Login</Link>
      </nav>
    </div>
  )
}

export default Users
