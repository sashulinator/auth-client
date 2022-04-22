import ROUTES from '../constants/routes'
import FormConstructor from '../pages/form-constructor'
import Login from '../pages/login'
import Users from '../pages/users'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

const RootRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />} />
        <Route path={ROUTES.LOGIN.PATH} element={<Login />} />
        <Route path={ROUTES.USERS.PATH} element={<Users />} />
      </Routes>
    </>
  )
}

export default RootRoutes
