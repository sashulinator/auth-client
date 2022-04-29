import ROUTES from '../constants/routes'
import FormConstructor from '../pages/form-constructor'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

const RootRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />} />
      </Routes>
    </>
  )
}

export default RootRoutes
