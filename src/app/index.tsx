import { initializeIcons } from '@fluentui/react'

import history from './history'
import './i18n'
import RootLayer from './layer'
import ThemeProvider from './theme-provider'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

export const App = () => {
  initializeIcons()

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider>
            <HistoryRouter history={history}>
              <RootLayer />
            </HistoryRouter>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </Suspense>
  )
}

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.render(<App />, document.getElementById('root'))
