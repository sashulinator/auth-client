import './reset.css'

import './common.css'
import './index.css'
import './toast.css'
import './utils.css'
import '@/shared/theme/ui/theme.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

import DocumentTitle from './document-title'
import RootRoutes from './root-routes'
import React, { FC } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ToastContainer } from 'react-toastify'

const RootLayer: FC = () => {
  return (
    <PerfectScrollbar className="RootScrollbar" id="Layout" style={{ zIndex: 300 }}>
      <DocumentTitle />
      <RootRoutes />
      <ToastContainer />
    </PerfectScrollbar>
  )
}

export default RootLayer
