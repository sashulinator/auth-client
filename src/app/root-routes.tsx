import { Spinner, SpinnerSize } from '@fluentui/react'
import { setPreviousRoute } from '@savchenko91/rc-route-constant'

import ROUTES from '../constants/routes'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Route, Routes, useNavigate } from 'react-router-dom'

import api from '@/api/api-axios'
import { LoginResponse, Transfer } from '@/api/types'
import FormConstructor from '@/pages/form-constructor/form-constructor'
import IncidentListPage from '@/pages/incident-list/incident-list'
import IncidentFormPage from '@/pages/incident/incident-form'
import LoginPage from '@/pages/login'
import RiskListPage from '@/pages/risk-list/risk-list'
import SchemaListPage from '@/pages/schema-list/schema-list'
import UserProfilePage from '@/pages/user-profile/user-profile'

export default function RootRoutes() {
  setPreviousRoute(ROUTES)
  const navigate = useNavigate()

  const { isLoading, data, isError } = useQuery(['refresh'], () =>
    api.post<Transfer<LoginResponse>>('/api/auth/refresh')
  )

  localStorage.setItem('userRole', data?.data.dataBlock.role || '')

  useEffect(() => {
    if (!data && !isLoading) {
      navigate(ROUTES.LOGIN.PATH)
    }
  }, [data, isLoading, isError])

  if (isLoading && !ROUTES.LOGIN.isCurrent) {
    return <Spinner size={SpinnerSize.large} />
  }

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
