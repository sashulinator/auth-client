import ROUTES from '../constants/routes'
import FormConstructor from '../pages/form-constructor'
import SchemaListPage from '../pages/schema-list'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

const RootRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />}>
          <Route path=":id" element={<SchemaListPage />} />
        </Route>
        <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListPage />} />
      </Routes>
    </>
  )
}

export default RootRoutes
