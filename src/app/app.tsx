import { initializeIcons } from '@fluentui/react'

import history from './history'
import './i18n'
import RootLayer from './layout'
import './register-icons'
import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { ThemeProvider } from '@/shared/theme'

const App = () => {
  initializeIcons()

  return (
    <RecoilRoot>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <RootLayer />
        </HistoryRouter>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
