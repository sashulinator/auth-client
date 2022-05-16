import ROUTES, { getCurrentRoute } from '../constants/routes'
import React, { FC } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import FormConstructor from '@/pages/form-constructor/form-constructor'
import IncidentListPage from '@/pages/incident-list'
import LoginPage from '@/pages/login'
import SchemaListPage from '@/pages/schema-list'
import Nav from '@/shared/nav'

const RootRoutes: FC = () => {
  const navigate = useNavigate()

  const currentRoute = getCurrentRoute()
  const isLogin = currentRoute?.NAME === ROUTES.LOGIN.NAME
  const isToken = localStorage.getItem('access_token')

  if (!isToken && !isLogin) {
    setTimeout(() => navigate(ROUTES.LOGIN.buildURL()))
  }

  return (
    <>
      <Nav />
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />}>
          <Route path=":id" element={<FormConstructor />} />
        </Route>
        <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListPage />} />
        <Route path={ROUTES.INCIDENT_LIST.PATH} element={<IncidentListPage />} />
        <Route path={ROUTES.LOGIN.PATH} element={<LoginPage />}>
          {/* <Route path=":id" element={<FormConstructor />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default RootRoutes
