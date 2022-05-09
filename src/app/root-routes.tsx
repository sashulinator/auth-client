import ROUTES from '../constants/routes'
import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import FormConstructor from '@/pages/form-constructor/form-constructor'
import SchemaListPage from '@/pages/schema-list'

const RootRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.FORM_CONSTRUCTOR.PATH} element={<FormConstructor />}>
          <Route path=":id" element={<FormConstructor />} />
        </Route>
        <Route path={ROUTES.SCHEMA_LIST.PATH} element={<SchemaListPage />} />
      </Routes>
    </>
  )
}

export default RootRoutes
