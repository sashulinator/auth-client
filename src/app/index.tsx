import { initializeIcons } from '@fluentui/react'

import history from './history'
import './i18n'
import RootLayer from './layer'
import store from './redux-store'
import ThemeProvider from './themeProvider'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

export const App = () => {
  initializeIcons()

  return (
    <Suspense fallback={<></>}>
      <Provider store={store}>
        <RecoilRoot>
          <ThemeProvider>
            <HistoryRouter history={history}>
              <RootLayer />
            </HistoryRouter>
          </ThemeProvider>
        </RecoilRoot>
      </Provider>
    </Suspense>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
