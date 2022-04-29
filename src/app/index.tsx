import { initializeIcons } from '@fluentui/react'

import history from './history'
import './i18n'
import RootLayer from './layer'
import ThemeProvider from './theme-provider'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

export const App = () => {
  initializeIcons()

  return (
    <Suspense fallback={<></>}>
      <RecoilRoot>
        <ThemeProvider>
          <HistoryRouter history={history}>
            <RootLayer />
          </HistoryRouter>
        </ThemeProvider>
      </RecoilRoot>
    </Suspense>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
