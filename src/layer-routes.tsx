import { FC } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/login'
import Users from './pages/users'
import ROUTES from './constants/routes'
import Header from './header'
import './index.css'
import './constants.css'
import './reset.css'

export const LayerRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Link to={ROUTES['USERS/LIST'].buildURL()}>User</Link>
        <Routes>
          <Route path={ROUTES.LOGIN.PATH} element={<Login />} />
          <Route path={ROUTES.USERS.PATH} element={<Users />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
