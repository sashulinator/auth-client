import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Users from './pages/users'
import 'shards-ui/dist/css/shards.min.css'
import ROUTES from './constants/routes'

export const LayerRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN.PATH} element={<Login />} />
        <Route path={ROUTES.USER.PATH} element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}
