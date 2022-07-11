import GetUser from './get-user'
import ReactQuery from './react-query'
import React, { lazy } from 'react'
import { createRoot } from 'react-dom/client'

const App = lazy(async () => import('./app'))

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)

  root.render(
    <ReactQuery>
      <GetUser>
        <App />
      </GetUser>
    </ReactQuery>
  )
}

// eslint-disable-next-line import/no-named-as-default-member
