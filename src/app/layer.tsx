import { Stack } from '@fluentui/react'

import './common.css'
import Header from './header'
import './index.css'
import './reset.css'
import RootRoutes from './root-routes'
import { FC } from 'react'

const RootLayer: FC = () => {
  return (
    <>
      <Header />
      <Stack as="main">
        <RootRoutes />
      </Stack>
    </>
  )
}

export default RootLayer
