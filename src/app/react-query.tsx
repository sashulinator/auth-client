import { initializeIcons } from '@fluentui/react'

import './i18n'
import './register-icons'
import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

interface ReactQueryProps {
  children: React.ReactNode
}

const ReactQuery = (props: ReactQueryProps) => {
  initializeIcons()

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </Suspense>
  )
}

export default ReactQuery
