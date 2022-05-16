import ROUTES from '../constants/routes'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import AccidentListPage from '@/pages/accident-list'
import FormConstructor from '@/pages/form-constructor/form-constructor'
import SchemaListPage from '@/pages/schema-list'
import Nav from '@/shared/nav'

const RootRoutes: FC = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />}>
          <Route path=":id" element={<FormConstructor />} />
        </Route>
        <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListPage />} />
        <Route path={ROUTES.ACCIDENT_LIST.PATH} element={<AccidentListPage />}>
          {/* <Route path=":id" element={<FormConstructor />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default RootRoutes
