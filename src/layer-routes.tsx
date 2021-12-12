import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Users from './pages/users'

export const LayerRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}
