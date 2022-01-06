import { FC } from 'react'
import { Stack } from '@fluentui/react'
import RootRoutes from './root-routes'
import Header from './header'
import './index.css'
import './reset.css'
import './common.css'

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
