import './reset.css'

import './common.css'
import './index.css'
import './toast.css'
import './utils.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import DocumentTitle from './document-title'
import RootRoutes from './root-routes'
import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'

const RootLayer: FC = () => {
  return (
    <>
      <DocumentTitle />
      <RootRoutes />
      <ToastContainer />
    </>
  )
}

export default RootLayer
