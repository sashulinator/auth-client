import { initializeIcons } from '@fluentui/react'

import ErrorBoundary from './error-boundary'
import history from './history'
import './i18n'
import RootLayer from './layer'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { ThemeProvider } from '@/shared/theme'

const queryClient = new QueryClient()

export const App = () => {
  initializeIcons()

  return (
    <Suspense>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ThemeProvider>
              <HistoryRouter history={history}>
                <RootLayer />
              </HistoryRouter>
            </ThemeProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />)
}

// eslint-disable-next-line import/no-named-as-default-member
