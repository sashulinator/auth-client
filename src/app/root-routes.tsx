import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Users from '../pages/users'
import ROUTES from '../constants/routes'

const RootRoutes: FC = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.LOGIN.PATH} element={<Login />} />
        <Route path={ROUTES.USERS.PATH} element={<Users />} />
      </Routes>
    </div>
  )
}

export default RootRoutes
