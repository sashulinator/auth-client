import { setPreviousRoute } from '@savchenko91/rc-route-constant'

import ROUTES from '../constants/routes'
import React, { FC } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import FormConstructor from '@/pages/form-constructor/form-constructor'
import IncidentListPage from '@/pages/incident-list'
import IncidentFormPage from '@/pages/incident/incident-form'
import LoginPage from '@/pages/login'
import SchemaListPage from '@/pages/schema-list'
import Nav from '@/shared/nav'
import Header from '@/widgets/header'

const RootRoutes: FC = () => {
  const navigate = useNavigate()

  const isToken = localStorage.getItem('access_token')

  setPreviousRoute(ROUTES)

  if (!isToken && !ROUTES.LOGIN.isCurrent) {
    setTimeout(() => navigate(ROUTES.LOGIN.PATH))
    return null
  }

  return (
    <>
      <Nav />
      <Header />
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />}>
          <Route path=":id" element={<FormConstructor />} />
        </Route>
        <Route path={ROUTES.CREATE_INCIDENT.PATH} element={<IncidentFormPage />}>
          <Route path=":id" element={<IncidentFormPage />} />
        </Route>
        <Route path={ROUTES.INCIDENT_LIST.PATH} element={<IncidentListPage />} />
        <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListPage />} />
        <Route path={ROUTES.LOGIN.PATH} element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default RootRoutes
