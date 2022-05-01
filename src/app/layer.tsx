import { Stack } from '@fluentui/react'

import './reset.css'

import './common.css'
import './index.css'
import './utils.css'

import Header from '../widgets/header/ui/header'
import DocumentTitle from './document-title'
import RootRoutes from './root-routes'
import React, { FC } from 'react'

const RootLayer: FC = () => {
  return (
    <>
      <DocumentTitle />
      <Header />
      <Stack as="main">
        <RootRoutes />
      </Stack>
    </>
  )
}

export default RootLayer
