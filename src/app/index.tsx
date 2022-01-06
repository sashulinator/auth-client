import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import ThemeProvider from './themeProvider'
import { Provider } from 'react-redux'
import RootLayer from './layer'
import store from './redux-store'
import history from './history'
import './i18n'

export const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Provider store={store}>
        <ThemeProvider>
          <HistoryRouter history={history}>
            <RootLayer />
          </HistoryRouter>
        </ThemeProvider>
      </Provider>
    </Suspense>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
