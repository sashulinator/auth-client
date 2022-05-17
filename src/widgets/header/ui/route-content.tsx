import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ROUTES from '@/constants/routes'
import FormConstructorHeaderContent from '@/pages/form-constructor/header-content'
import IncidentListHeaderContent from '@/pages/incident-list/header-content'
import SchemaListHeaderContent from '@/pages/schema-list/header-content'

export default function RouteContent(): JSX.Element {
  return (
    <Routes>
      <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructorHeaderContent />}>
        <Route path=":id" element={<FormConstructorHeaderContent />} />
      </Route>
      {/* <Route path={ROUTES.INCIDENT.PATH} element={<IncidentPage />}>
        <Route path=":id" element={<IncidentPage />} />
      </Route> */}
      <Route path={ROUTES.INCIDENT_LIST.PATH} element={<IncidentListHeaderContent />} />
      <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListHeaderContent />} />
    </Routes>
  )
}
