import { FC } from 'react'
import RootRoutes from './root-routes'
import Header from './header'
import './index.css'
import './constants.css'
import './reset.css'

const RootLayer: FC = () => {
  return (
    <>
      <Header />
      <main>
        <RootRoutes />
      </main>
    </>
  )
}

export default RootLayer
