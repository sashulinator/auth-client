import { FC } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import cx from 'clsx'

type UsersProps = {
  className?: string
}

const Users: FC<UsersProps> = ({ className }): JSX.Element => {
  return (
    <div className={cx('Users', className)}>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path=":id" element={<div>User Profile</div>} />
        <Route path="me" element={<div>Own user profile</div>} />
      </Routes>
    </div>
  )
}

export default Users
