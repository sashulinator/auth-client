import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import RootLayer from './layer'
import store from './redux-store'
import history from './history'

export const App = () => {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <RootLayer />
      </HistoryRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
