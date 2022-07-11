import { setPreviousRoute } from '@savchenko91/rc-route-constant'

import ROUTES from '../constants/routes'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import FormConstructor from '@/pages/form-constructor/form-constructor'
import IncidentListPage from '@/pages/incident-list/incident-list'
import IncidentFormPage from '@/pages/incident/incident-form'
import LoginPage from '@/pages/login'
import RiskListPage from '@/pages/risk-list/risk-list'
import SchemaListPage from '@/pages/schema-list/schema-list'
import UserProfilePage from '@/pages/user-profile/user-profile'

const RootRoutes: FC = () => {
  setPreviousRoute(ROUTES)

  return (
    <>
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />}>
          <Route path=":id" element={<FormConstructor />} />
        </Route>
        <Route path={ROUTES.INCIDENT.PATH} element={<IncidentFormPage />} />
        <Route path={ROUTES.CREATE_INCIDENT.PATH} element={<IncidentFormPage />} />
        <Route path={ROUTES.INCIDENT_LIST.PATH} element={<IncidentListPage />} />
        <Route path={ROUTES.RISK_LIST.PATH} element={<RiskListPage />} />
        <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListPage />} />
        <Route path={ROUTES.LOGIN.PATH} element={<LoginPage />} />
        <Route path={ROUTES.USER_PROFILE.PATH} element={<UserProfilePage />} />
      </Routes>
    </>
  )
}

export default RootRoutes
