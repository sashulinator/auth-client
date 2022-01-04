import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import ROUTES from '../../constants/routes'

import UserList from './list/_main'

const Users: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES['USERS/LIST'].PATH} element={<UserList />} />
    </Routes>
  )
}

export default Users
