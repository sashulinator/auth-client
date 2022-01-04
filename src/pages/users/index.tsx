import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import ROUTES from '../../constants/routes'

import UserList from './list/_main'
import CreateUser from './create/_main'

const Users: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES['USERS/LIST'].PATH} element={<UserList />} />
      <Route path={ROUTES['USERS/CREATE'].PATH} element={<CreateUser />} />
    </Routes>
  )
}

export default Users
